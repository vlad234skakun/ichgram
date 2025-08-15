import { rename } from 'node:fs/promises'
import { UserDocument } from '../db/User'

import fs from "fs"
import path from "path"
import User from '../db/User'
import HttpExeption from '../utils/HttpExeption'

export interface IUpdateProfilePayload {
  username?: string;
  website?: string;
  biography?: string;
}

export const getMyProfile = async (user: UserDocument) => {
  const foundUser = await User.findById(user._id).select("-password -token -verificationCode");
  return foundUser;
}

const myAvatarDir = path.resolve("public", "myAvatar")

export const updateProfilePhoto = async (user: UserDocument, file: Express.Multer.File) => {
  const foundUser = await User.findById(user._id);
  if (!foundUser) throw HttpExeption(404, "User not found");

  if (foundUser.profilePhoto) {
    const oldPhotoPath = path.resolve("public" , foundUser.profilePhoto);
    if (fs.existsSync(oldPhotoPath)) {
      fs.unlinkSync(oldPhotoPath);
    }
  }
  if (file) {
      const {path: oldPath , filename} = file
      const newPath = path.join(myAvatarDir , filename)
      await rename(oldPath, newPath)
      const newPhotoPath = path.join("myAvatar", filename)
    foundUser.profilePhoto = newPhotoPath;
    await foundUser.save();

  return foundUser;
    }
};

export const updateProfileInfo = async(user: UserDocument, payload: IUpdateProfilePayload) => {
  const foundUser = await User.findById(user._id);
  if (!foundUser) throw HttpExeption(404, "User not found")
    const { username, website, biography } = payload;
  if (payload.username !== undefined) foundUser.username = payload.username;
  if (payload.website !== undefined) foundUser.website = payload.website;
  if (payload.biography !== undefined) foundUser.biography = payload.biography;
  await foundUser.save();
  return foundUser
}