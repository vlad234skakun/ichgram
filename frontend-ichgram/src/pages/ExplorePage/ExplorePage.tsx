import styles from './ExplorePage.module.css'
import { useState } from 'react';
import { getAllPostsApi } from '../../shared/api/posts-api';
import { useEffect } from 'react';

const mediaUrl = import.meta.env.VITE_MEDIA_URL


export interface Post {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profilePhoto?: string;
  };
  photo: string;
  text?: string;
  likesCount: number;
  commentsCount: number;
}

const ExplorePage = () => {

	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

useEffect(() => {
		const fetchPosts = async () => {
			try {
				const data = await getAllPostsApi(); // получает только посты подписок
				setPosts(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className={styles.container} >
		{posts.map((post) => (
      <div key={post._id} className={styles.postItem}>
        <img
          src={`${mediaUrl}/${post.photo}`}
          alt={post.text || "Post image"}
          className={styles.image}
        />
      </div>
    ))}
		</div>
	)
};

export default ExplorePage;