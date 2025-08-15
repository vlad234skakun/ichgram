import { addUser , loginUser, verify, getCurrent } from '../services/users.services'
import  validateBody from '../utils/validateBody'
import { addUserSchema , loginUserSchema } from '../validation/users.schema'
import { Request , Response } from 'express'
import { UserDocument } from '../db/User'
import { ILoginResponse } from '../services/users.services'
import { AuthenticatedRequest } from '../typescript/interfaces'
import { logout } from '../services/users.services'

export const addUsersController = async (req: Request , res: Response): Promise<void> => { 
	// validateSchema
	await validateBody(addUserSchema, req.body)
	const result: UserDocument = await addUser(req.body)
	res.status(201).json({
		message: `user ${result.email} succeffully register. Please confirm email`
	})
	
}

export const loginUsersController = async(req: Request , res: Response): Promise<void> => { 
	await validateBody(loginUserSchema , req.body)
	const result: ILoginResponse = await loginUser(req.body)
	res.status(201).json({
		message: "Успешно залогирован",
		result
	})
}

export const getCurrentController = async(req: Request, res: Response): Promise<void> => {
	const user = (req as AuthenticatedRequest).user;
	const result = await getCurrent(user);
    res.json(result);
}

export const verifyController = async(
	req: Request, 
	res: Response): Promise<void> => {
		await verify(req.body.code)
		res.status(200).json({ message: "Verification successful" });
}

export const logoutController = async(req: Request , res: Response) => {
	const user = (req as AuthenticatedRequest).user;
	await logout(user)
  res.status(200).json({ message: "Logout successful" });
  
	
}