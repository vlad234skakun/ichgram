import { UserDocument } from '../db/User'
import HttpExeption from '../utils/HttpExeption'
import User from '../db/User'
import mongoose from 'mongoose'

export const followUser = async (id: string, user: UserDocument) => {
  const currentUserId = new mongoose.Types.ObjectId(user._id as string);
  const targetUserId = new mongoose.Types.ObjectId(id);

  if (currentUserId.equals(targetUserId)) throw HttpExeption(400, "You cant subscribe to yourself");

  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);

  if (!targetUser || !currentUser) throw HttpExeption(404, "users not found");

  const alreadyFollowing = targetUser.followers.some(f => f.equals(currentUserId));
  if (alreadyFollowing) throw HttpExeption(400, "You are already following this user");

  targetUser.followers.push(currentUserId);
  currentUser.following.push(targetUserId);

  await targetUser.save();
  await currentUser.save();

  return {
    message: "Followed successfully",
    targetUser: {
      id: targetUser._id,
      followersCount: targetUser.followers.length
    },
    currentUser: {
      id: currentUser._id,
      followingCount: currentUser.following.length
    }
  }
}
