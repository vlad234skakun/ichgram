import { Request, Response } from 'express'
import { addPost, getPosts, deletePost, getUserPosts } from '../services/Posts.services'
import { AuthenticatedRequest } from '../typescript/interfaces'
import Post from '../db/Post'
import User from '../db/User'
import { log } from 'console'
import HttpExeption from '../utils/HttpExeption'


export const addPostController = async(req: Request , res: Response) => { 

	const result = await addPost(
    {
      payload: req.body,
      file: req.file,
    },
    (req as AuthenticatedRequest).user
  );
  res.json(result);
	
}

export const getPostsController = async(req: Request, res: Response) => {
  const result = await getPosts(
    (req as AuthenticatedRequest).user
  )
  res.json(result);
} 

export const getAllPostsController = async(req: Request, res: Response) => { 
  const user = (req as AuthenticatedRequest).user
  if(!user)  throw HttpExeption(404, "user not found")
  try {
    const posts = await Post.find()
      // .sort({ createdAt: -1 })
       .populate("userId", "username profilePhoto"); // подгружаем ник и аватар
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deletePostController = async(req: Request, res: Response) => { 
   const { postId } = req.params;
       console.log(postId)
    const result = await deletePost(postId)
    console.log(result)
    res.json(result)
}

export const getUserPostsConroller = async(req: Request, res: Response) => {
  const {id} = req.params
  const result = await getUserPosts(id)
  res.status(200).json(result);
}

