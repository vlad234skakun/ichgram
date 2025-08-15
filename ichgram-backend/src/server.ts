import cors from "cors"
import express, { Express } from 'express'
import ErrorHandler from './middlewares/errorHandler'
import authRouter from './routers/usersRouter'
import { getMyProfileController } from './controllers/myProfile.Controller'
import { authenticate } from './middlewares/authorization'
import postsRouter from './routers/postsRouter'
import commentsRouter from './routers/commentsRouter'
import searchRouter from './routers/searchRouter'
import followRouter from './routers/followRouter'

import NotFounHandler from './middlewares/NotFounHandler'
import myProfileRouter from './routers/myProfileRouter'
import likesRouter from './routers/likesRouter'

const startServer = () => {
 const app: Express = express()

 app.use(cors())
 app.use(express.json())
 app.use(express.static("public"))
 app.use(express.static("myAvatar"))


 
//  app.use('/api/auth', authRouter)
 app.use('/api/auth', authRouter)
 app.use('/api/me', myProfileRouter)
 app.use('/api/posts', postsRouter)
 app.use("/api/likes", likesRouter)
 app.use("/api/comments", commentsRouter)
 app.use("/api/users", searchRouter)
 app.use("/api/follow", followRouter)


 

	app.use(ErrorHandler)
	app.use(NotFounHandler)
 const port: number = Number(process.env.PORT) || 3000;
 
 app.listen(port , ()=> console.log("Server running on 3000 port"))

}
export default startServer;
