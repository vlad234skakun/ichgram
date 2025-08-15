import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../typescript/interfaces'
import HttpExeption from '../utils/HttpExeption'
import { getAllUsers, getUserById } from '../services/search.services'


export const searchController = async(req: Request, res: Response) => {
	const user = (req as AuthenticatedRequest).user;
	
	try {
    const users = await getAllUsers(user);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getUserByIdController = async(req: Request, res: Response) => { 
	const {id} = req.params
	const user = await getUserById(id)
	res.status(200).json(user)
}