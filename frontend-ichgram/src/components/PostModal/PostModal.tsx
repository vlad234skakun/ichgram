import { useEffect, useState, type FC } from 'react'
import type { User } from '../../pages/EditProfile/EditProfile'
import type { IPost } from '../../pages/ProfilePage/ProfilePage'
import { addComment, getComments } from '../../shared/api/posts-api'
import LikeButton from '../LikeButton/LikeButton'
import styles from './PostModal.module.css'
import { BsThreeDots } from "react-icons/bs";
import { deletePost } from '../../shared/api/posts-api'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from "../../../public/defaultAvatar.svg"
// user?.profilePhoto ? `${mediaUrl}/${post.photo}` : defaultAvatar


const mediaUrl = import.meta.env.VITE_MEDIA_URL;

interface PostModalProps {
  post: IPost;
	user: User | null;
}


const PostModal: FC<PostModalProps> = ({ post , user}) => {
	const [count , setLikeCount] = useState(0)
	const [commentText , setCommentText ] = useState("")
	const [comments , setComments] = useState<any[]>([])
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate()
	console.log("userComent",comments);
	console.log("user",user);


	useEffect(() => { 
		const fetchComments = async() => { 
			try {
				const comments = await getComments(post._id)
			setComments(comments);
			} catch (error) {
				console.error('Error loading comments:', error);
			}
		}
		fetchComments()
	}, [])


const handleSendComment = async() => {
	 if (!commentText.trim()) return; // не отправляем пустое
	 try {
		const newComment = await addComment(post._id, commentText);
      setComments(prev => [newComment, ...prev]); // добавляем сверху
      setCommentText(''); // очищаем поле
	 } catch (error) {
		console.log('Error loading comments:', error)
	 }
}

const handleDeletePost = async () => {
    try {
			console.log("запрос пошел");
			
      await deletePost(post._id); // API-запрос на удаление
      // Закрыть модалку или обновить список постов
			navigate("/home")
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.imageBorder}>
        <img src={`${mediaUrl}/${post.photo}`} alt="Post" className={styles.image} />
      </div>
      <div className={styles.infoSection}>
        <div className={styles.userInfo}>
					<div className={styles.userInfoContainer}>
						<div className={styles.avatarBorder}>
        			<img src={user?.profilePhoto ? `${mediaUrl}/${post.photo}` : defaultAvatar} alt="Post" 
							className={styles.avatarImage} />
      		</div>
          <strong className={styles.username} >{/* {post.user.username} */}{user?.username}</strong> 
					</div>
					<div className={styles.menuIcon} onClick={() => setMenuOpen(prev => !prev)}>
        		<BsThreeDots size={24} /> {/* размер иконки */}
      		</div> 
        </div>

				<div className={styles.comments}>
          {/* Тут можно вывести список комментариев */}
					{post.text && 
					<div className={styles.description} >
						<div className={styles.avatarBorder}>
        			<img src={user?.profilePhoto ? `${mediaUrl}/${post.photo}` : defaultAvatar} alt="Post" 
							className={styles.avatarImage} />
      			</div>
						<div className={styles.descriptionTextContainer} ><h1 className={styles.username}>{user?.username}</h1> 
						<p className={styles.descriptionText} >
						{post.text}
						</p>
						</div>
					</div>}			
					{comments.map((c) => (
  				<div key={c._id} className={styles.description}>
						<div className={styles.avatarBorder}>
        			<img src={`${mediaUrl}/${c.userId.profilePhoto}`} alt="Post" 
							className={styles.avatarImage} />
      			</div>
    				<div className={styles.descriptionTextContainer} ><h1 className={styles.username}>{c.userId.username}</h1> 
						<p className={styles.descriptionText} >
						{c.text}
						</p>
						</div>
  					</div>
						))}	
        </div>
        <div className={styles.actions}>
					<div className={styles.fitback} >
							<div className={styles.buttonContainer} >
          			<LikeButton postId={post._id} setLikeCount={setLikeCount}/>
							</div>
					<h1>{count} likes</h1>
					</div>
					<div className={styles.commentFooter} >
						<input className={styles.commentInput} placeholder='Add comment' type="text" value={commentText}
              onChange={e => setCommentText(e.target.value)} />
						<button onClick={handleSendComment} className={styles.sendComment}>Send</button>
					</div> 
        </div>
      </div>
			{menuOpen && (
        <div className={styles.modalOverlay}>
					<div className={styles.modalContentButtons} >
							<button className={`${styles.modalButton} ${styles.delete}`} onClick={() => handleDeletePost()}>Delete</button>
          <button className={`${styles.modalButton} ${styles.cancel}`} onClick={() => setMenuOpen(false)}>Cancel</button>
					</div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
