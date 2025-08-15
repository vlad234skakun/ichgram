import { Request, Response, NextFunction } from "express";
import { IHttpError } from '../typescript/interfaces';

const ErrorHandler = (error: IHttpError, _: Request, res: Response, __: NextFunction) => {

	const {status , message} = error

	res.status(status || 500).json({
		message
		
	})
}

export default ErrorHandler;