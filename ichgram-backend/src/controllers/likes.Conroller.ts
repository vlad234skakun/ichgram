import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../typescript/interfaces'
import HttpExeption from '../utils/HttpExeption'
import { toggleLike, getLikeInfo } from '../services/likes.services'


export const likesConroller = async(req: Request , res: Response) => { 
	const user = (req as AuthenticatedRequest).user;
	const { postId } = req.params

	const result = await toggleLike(user , postId)
	res.json(result)
}

export const likeInfoController = async(req: Request , res: Response) => {
	const user = (req as AuthenticatedRequest).user
	const { postId } = req.params
	const result = await getLikeInfo(user , postId)
	res.json({ liked: !!result.existing  , count: result.count}); 
}