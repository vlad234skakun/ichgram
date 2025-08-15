import { Router } from 'express';
import { authenticate } from '../middlewares/authorization'
import { likesConroller, likeInfoController } from '../controllers/likes.Conroller';


const likesRouter = Router()

likesRouter.post("/:postId/toggle", authenticate, likesConroller)
likesRouter.get("/:postId/status", authenticate, likeInfoController)


export default likesRouter;
