import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../typescript/interfaces'
import HttpExeption from '../utils/HttpExeption'
import { followUser } from '../services/follow.services'

export const followUserController = async(req: Request , res: Response) => {
	const {id} = req.params
	const user = (req as AuthenticatedRequest).user;
	const result = await followUser(id , user)
	res.json(result)

}