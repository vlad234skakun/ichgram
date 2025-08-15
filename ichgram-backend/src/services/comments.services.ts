import { UserDocument } from '../db/User'
import User from '../db/User';
import Post from '../db/Post';
import Comment from '../db/Comment';
import HttpExeption from '../utils/HttpExeption';


export const addComment = async(user: UserDocument , postId: string , text: string) => { 
	const foundUser = await User.findById(user._id)
	if (!foundUser) throw HttpExeption(404, `User not found`);
	const post = await Post.findById(postId);
	if (!post) throw HttpExeption(404, `Post with id=${postId} not found`);
	if (!text.trim()) throw HttpExeption(400, "Comment cannot be empty")
	const comment = await Comment.create({
    postId,
    userId: user._id,
    text,
  });
	await comment.populate("userId", "username profilePhoto");
	return comment
}

export const getComments = async(postId: string) => {
	const comments = await Comment.find({ postId })
	.populate("userId", "username profilePhoto")
  .sort({ createdAt: -1 });
	return comments
}