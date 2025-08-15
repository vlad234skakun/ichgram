import { Router } from 'express';
import { authenticate } from '../middlewares/authorization'

import { addCommentController , getCommentsController } from '../controllers/Comments.Controller';

const commentsRouter = Router()

commentsRouter.post("/:postId/addcomment", authenticate, addCommentController)
commentsRouter.get('/:postId/getcomments', authenticate, getCommentsController)

export default commentsRouter