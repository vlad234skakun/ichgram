import User from '../db/User';
import Post from '../db/Post';
import type { UserDocument } from '../db/User';
import HttpExeption from '../utils/HttpExeption'
import Like from '../db/Like';

export const toggleLike = async(user: UserDocument , postId: string) => { 
	const foundUser: UserDocument | null = await User.findById(user._id);
  if (!foundUser) throw HttpExeption(404, `User not found`);
	const post = await Post.findById(postId);
  if (!post) throw HttpExeption(404, `Post with id=${postId} not found`);
		const userId = user._id
    const existing = await Like.findOne({ userId, postId });
    if (existing) {
      await existing.deleteOne();
      return { liked: false };
    } else {
      await Like.create({ userId, postId });
      return { liked: true };
    }
}

export const getLikeInfo = async(user: UserDocument ,postId: string ) => { 
	const foundUser = await User.findById(user._id)
	if (!foundUser) throw HttpExeption(404, `User not found`);
	const post = await Post.findById(postId);
	if (!post) throw HttpExeption(404, `Post with id=${postId} not found`);
	const userId = user._id
	const count = await Like.countDocuments({ postId });
	const existing = await Like.findOne({ userId, postId });
	return {existing , count}
}

