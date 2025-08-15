import { UserDocument } from '../db/User'
import User from '../db/User';
import Post from '../db/Post';
import Comment from '../db/Comment';
import HttpExeption from '../utils/HttpExeption';

export const getAllUsers = async(user: UserDocument) => {
	const founduser: UserDocument | null = await User.findById(user._id);
		 if (!founduser) throw HttpExeption(404, `User not found`);
	try {
    const users = await User.find({ _id: { $ne: user._id } }) // $ne = not equal
      .select('-password -token -verificationCode'); // убираем пароль
    return users;
  } catch (error) {
    throw new Error('Ошибка при получении пользователей');
  }
}

export const getUserById = async(id: string) => {
	const user = await User.findById(id)
    .select('-password -token -verificationCode'); // убираем лишние поля
		if(!user) throw HttpExeption(404, "User not found")
			return user
}