import { Request, Response , NextFunction } from 'express'
import HttpExeption from '../utils/HttpExeption';
import jwt from "jsonwebtoken";
import User from '../db/User'

import { AuthenticatedRequest } from '../typescript/interfaces';

import { IJWTTokenPayload } from '../function/jsonwebtoken';

const { JWT_SECRET } = process.env;

export const authenticate  = async (
	req: Request ,res: Response , next: NextFunction): Promise<void> => { 
		const authorization: string | undefined = req.headers.authorization;
		 if (!authorization) throw HttpExeption(401, "Authorization header missing");
		 const [bearer, token] = authorization.split(" ");
		 if (bearer !== "Bearer") throw HttpExeption(401, "Bearer missing");
		 try {
			if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
			const { id } = jwt.verify(token, JWT_SECRET) as IJWTTokenPayload;
			const user = await User.findById(id)
			if (!user) {
      return next(HttpExeption(401, "User not found"))}
			(req as AuthenticatedRequest).user = user
			next();
		 } catch (error) {
			if (error instanceof Error) {
      throw HttpExeption(401, error.message);
    }
		 }
}