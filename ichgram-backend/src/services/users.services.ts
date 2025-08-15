import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import HttpExeption from '../utils/HttpExeption'
import { UserDocument } from '../db/User'
import User from '../db/User'
import { Types } from 'mongoose'
import sendEmailWithMailgun from '../utils/sendEmailWithMailgun'
import { nanoid } from 'nanoid'


const { JWT_SECRET, FRONTEND_URL } = process.env

interface CreateTokenPayload {
  id: unknown;
}

export interface ILoginResponse{ 
	token: string;
	user: {
		_id: unknown;
    email: string;
    fullname: string;
    username: string;
	}

}

interface Login { 
	email: string;
	password: string;
}

const createToken = (user: UserDocument): string => {
	const secretKey = JWT_SECRET; 
	const payload: CreateTokenPayload = {
		id: user._id
	}
	const token: string = jwt.sign(payload, secretKey as string,{ expiresIn: '24h' })
	return token
}

export const addUser = async (payload: UserDocument) => {
	const existingUser: UserDocument | null = await User.findOne({ email: payload.email})
	if (existingUser) throw HttpExeption(409 , " пользователь с такой почтой уже существует")
		const existingUserName: UserDocument | null = await User.findOne({username: payload.username})
	if (existingUserName) throw HttpExeption(409 , "Пользователь с таким username уже существует")
		const hashpassword = await bcrypt.hash(payload.password , 10)
	const verificationCode = nanoid();
		const newUser = await User.create({ 
		...payload,
		password: hashpassword,
		role: "user",
		verificationCode
	})
	const verifyEmail ={ 
		to: [payload.email],
    subject: "Verify email",
    text: "Testing some Mailgun awesomness!",
    html: `<a href="${FRONTEND_URL}?verificationCode=${verificationCode}" target="_blank" >Verify email</a>`
	}
	await sendEmailWithMailgun(verifyEmail)
	return newUser
}

export const verify = async (code: string) => {
	
	code = code.trim();
	const user = await User.findOne({verificationCode: code})
		
	if (!user) throw HttpExeption(404, "Verification code is invalid or expired");
  if (user.verify) throw HttpExeption(409, "Email already verified");
		user.verificationCode = ""
	user.verify = true
	await user.save()
}

export const loginUser = async ({email , password}: Login  /* payload */) => { 
	const user: UserDocument | null = await User.findOne({email: email})
	if(!user) throw HttpExeption(401 , "Пользователя с таким email не существует") 
		if(!user.verify) throw HttpExeption(401 , "Email not confirm")
		const comparepassword: boolean = await bcrypt.compare(password , user.password)
	if (!comparepassword) throw HttpExeption(401 , "Неверный пароль") 

	const token: string = createToken(user)
	user.token = token 
	await user.save()
	return {
		token,
		user: {
			 _id: user._id,
    email: user.email,
    fullname: user.fullname,
    username: user.username,
		}
	}
}

export const getCurrent = async(user: UserDocument) => {
	const token = createToken(user);
  user.token = token;
  await user.save();

  return {
    token,
    user: {
      email: user.email,
      fullName: user.fullname,
    },
  };
}

export const logout = async (user: UserDocument): Promise<boolean> => {
  const foundUser: UserDocument | null = await User.findById(user._id);
  if (!foundUser) throw HttpExeption(401, `User not found`);
  foundUser.token = "";
  await foundUser.save();
  return true;
};