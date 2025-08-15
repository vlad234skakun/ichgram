import { Request, Response } from 'express'
import * as myProfileServices from "../services/myProfile.services"
import { AuthenticatedRequest } from '../typescript/interfaces'
import { updateProfilePhoto , getMyProfile, updateProfileInfo} from '../services/myProfile.services'
import HttpExeption from '../utils/HttpExeption'

export const getMyProfileController = async (req:Request , res: Response) => {
	try {
    const user = (req as AuthenticatedRequest).user;
    const result = await getMyProfile(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const updateMyProfilePhoto = async(req:Request , res: Response) => {
    const user = (req as AuthenticatedRequest).user;
    const file = req.file
  try {
     if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const updatedUser = await updateProfilePhoto(user , file)
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
}

export const updateMyProfileInfo = async(req: Request , res: Response) => { 
  const user = (req as AuthenticatedRequest).user
  if (!user) throw HttpExeption(401, "Not authorized");
  const newInfo = req.body
  try {
    const updateUser = await updateProfileInfo(user , newInfo)
    res.json(updateUser)
  } catch (error) {
    
  }

  // const updateUser = await updateMyProfileInfo(user , )
}