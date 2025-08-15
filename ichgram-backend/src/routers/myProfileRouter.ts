import { Router } from 'express';
import { getMyProfileController , updateMyProfilePhoto, updateMyProfileInfo } from '../controllers/myProfile.Controller';
import { authenticate } from '../middlewares/authorization'
import upload from '../middlewares/upload';


const myProfileRouter: Router = Router()

myProfileRouter.get("/", authenticate,  getMyProfileController)
myProfileRouter.put("/update-photo", authenticate, upload.single("profilePhoto"), updateMyProfilePhoto)
myProfileRouter.put("/update-profileinfo" , authenticate, updateMyProfileInfo)

export default myProfileRouter