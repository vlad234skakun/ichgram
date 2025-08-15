import { Router } from 'express';
import { authenticate } from '../middlewares/authorization'
import { searchController, getUserByIdController } from '../controllers/search.Controller';


const searchRouter = Router()

searchRouter.get("/search",authenticate, searchController)
searchRouter.get("/:id",authenticate, getUserByIdController)


export default searchRouter;