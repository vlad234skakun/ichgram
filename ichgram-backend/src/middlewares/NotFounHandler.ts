import { Request, Response } from "express";


const NotFounHandler = (req: Request , res: Response) => {
	res.status(404).json({
		message: `${req.url} not found`
	})
}

export default NotFounHandler;