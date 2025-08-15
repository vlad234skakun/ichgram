import { Response, Request } from 'express'
import { AuthenticatedRequest } from '../typescript/interfaces'
import HttpExeption from '../utils/HttpExeption'
import { addComment, getComments } from '../services/comments.services'


export const addCommentController = async(req: Request, res: Response) => {
	const user = (req as AuthenticatedRequest).user
	const { postId } = req.params;
	const {text} = req.body
	
	 if (typeof text !== 'string') {
      return res.status(400).json({ message: 'text must be a string' });
    }
	const comment = await addComment(user , postId , text)
	res.status(201).json(comment)
}

export const getCommentsController = async(req: Request, res: Response) => {
		const { postId } = req.params;
		const commenst = await getComments(postId)
		res.status(201).json(commenst)
}