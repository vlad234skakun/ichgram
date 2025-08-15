import { useState, type FC } from 'react'
import styles from "./UserProfilePosts.module.css"
import type { IPost } from '../../pages/ProfilePage/ProfilePage';
import PostModal from '../PostModal/PostModal';
import Modal from '../Modal/Modal';
import type { User } from '../../pages/EditProfile/EditProfile';


interface IPostsProps { 
	posts: IPost[] | null
	user: User | null;
}

const mediaUrl = import.meta.env.VITE_MEDIA_URL

const UserProfilePosts: FC<IPostsProps> = ({posts = [] , user}) => {
	const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

	if (!posts) return (
	<div className={styles.notPosts} >
		<h1>You dont have a Post</h1>
	</div>

	)
	const element = posts.map((post) => (
		
			<div key={post._id} onClick={()=> setSelectedPost(post)} className={styles.imageContainer}>
				<img src={`${mediaUrl}/${post.photo}`} alt="photo" className={styles.image} />
			</div>
	))

	return ( 
		
		<section className={styles.sectionContainer}>
		<div className={styles.postsContainer}>
			{element}
		</div>
		{selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <PostModal post={selectedPost} user={user}/>
        </Modal>
      )}
		</section>
		
	)
};

export default UserProfilePosts