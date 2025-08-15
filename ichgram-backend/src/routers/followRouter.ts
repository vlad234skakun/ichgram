import { Router } from 'express';
import { authenticate } from '../middlewares/authorization'
import { followUserController } from '../controllers/follow.Controller';



const followRouter = Router()

followRouter.post("/:id", authenticate, followUserController)



export default followRouter;
