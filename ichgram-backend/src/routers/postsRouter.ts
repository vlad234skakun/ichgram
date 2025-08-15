import { Router } from 'express';
import { authenticate } from '../middlewares/authorization';
import { addPostController, getPostsController, deletePostController, getUserPostsConroller , getAllPostsController} from '../controllers/Posts.Controller'
import upload from '../middlewares/upload';

const postsRouter: Router = Router()

postsRouter.post("/addpost", authenticate, upload.single("photo"),addPostController)
postsRouter.get("/myposts", authenticate , getPostsController)
postsRouter.get("/all" , authenticate, getAllPostsController)
postsRouter.delete('/:postId/delete',authenticate, deletePostController)
postsRouter.get('/:id',authenticate, getUserPostsConroller)



export default postsRouter;