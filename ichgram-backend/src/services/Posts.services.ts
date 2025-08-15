import { rename } from 'node:fs/promises'
import User from '../db/User';
import Post from '../db/Post';
import HttpExeption from '../utils/HttpExeption';
import * as path from "node:path"
import { AddPostSchema } from '../validation/posts.schema';
import { UserDocument } from '../db/User';

const myPostsDir = path.resolve("public", "myPosts")

export interface IAddPost { 
	payload: AddPostSchema
	file: Express.Multer.File | undefined;
}

export const addPost = async({ payload, file }: IAddPost, user: UserDocument) => {
	 const foundUser = await User.findById(user._id);
  if (!foundUser) throw HttpExeption(404, `User not found`);
	if (file) {
		const {path: oldPath , filename} = file
		const newPath = path.join(myPostsDir , filename)
		await rename(oldPath, newPath)
		const photo = path.join("myPosts", filename)
		const post = await Post.create({userId: user._id, text: payload.text, photo})
		return post;
	}
	
}

export const getPosts = async(user:UserDocument) => {
	 const founduser: UserDocument | null = await User.findById(user._id);
	 if (!user) throw HttpExeption(404, `User not found`);
	 const posts = await Post.find({ userId: user._id }).sort({ updatedAt: -1 })
	 return posts

}

export const deletePost = async(postId: string) => {
	
    const post = await Post.findById(postId);
		console.log(post)
    if (!post) throw HttpExeption(404, "Post not found")

    // Можно добавить проверку, что удаляет автор поста
    // if (post.userId.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Not allowed" });
    // }

    const result = await Post.findByIdAndDelete(postId);
		return result
}

export const getUserPosts = async(id: string) => { 
	const founduser: UserDocument | null = await User.findById(id);
	 if (!founduser) throw HttpExeption(404, `User not found`);
	const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });
	return posts
}

