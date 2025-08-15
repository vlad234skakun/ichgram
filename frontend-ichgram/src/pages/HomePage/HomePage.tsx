import styles from "./HomePage.module.css"
import { useState } from 'react';
import { getAllPostsApi } from '../../shared/api/posts-api';
import { useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';



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
const HomePage = () => { 
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

console.log("posts",posts);


	return (
		
    <div className={styles.container} >
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default HomePage;