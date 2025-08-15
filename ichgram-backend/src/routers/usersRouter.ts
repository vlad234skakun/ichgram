import { Router } from 'express'
import { addUsersController , loginUsersController, verifyController,getCurrentController, logoutController } from '../controllers/users.Controller'
import { authenticate } from '../middlewares/authorization'

const authRouter: Router = Router()

authRouter.post("/register" , addUsersController)
authRouter.post("/login", loginUsersController)
authRouter.post("/verify", verifyController)
authRouter.get("/current", authenticate, getCurrentController)
authRouter.post("/logout", authenticate, logoutController)



export default authRouter