import type { FC } from "react";
import type { Post } from "../../pages/HomePage/HomePage";
import styles from "./PostCard.module.css"
import defaultAvatar from "../../../public/defaultAvatar.svg"
import LikeButton from '../LikeButton/LikeButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const mediaUrl = import.meta.env.VITE_MEDIA_URL;


interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
		const [count , setLikeCount] = useState(0)
	
  const handleLike = () => {
    console.log("Liked post", post._id);
    // сюда можно добавить вызов API для лайка
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.header} >
        <div className={styles.avatarBorder}>
						<img src={post.userId?.profilePhoto ? `${mediaUrl}/${post.photo}` : defaultAvatar} alt="Post" 
						className={styles.avatarImage} />
				</div>
				<Link className={styles.username} to={`/user/${post.userId._id}`} >
        <span >{post.userId.username}</span>
				</Link>
      </div>
      <div className={styles.imageBorder}>
        <img src={`${mediaUrl}/${post.photo}`} alt="Post" className={styles.image} />
      </div>
      <div className={styles.footer} >
					<div className={styles.buttonContainer} >
          		<LikeButton postId={post._id} setLikeCount={setLikeCount}/>
					</div>
					<h1 className={styles.likes} >{count} likes</h1>
					{post.text && <p className={styles.text}>{post.text}</p>}
			</div>
    </div>
  );
};

export default PostCard;