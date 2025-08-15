import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileInfo from '../../components/UserProfileInfo/UserProfileInfo';
import UserProfilePosts from '../../components/UserProfilePosts/UserProfilePosts';
import styles from "./UserProfilePage.module.css";
import { getUserByIdApi } from '../../shared/api/users-api';
import type { User } from '../ProfilePage/ProfilePage';
import { getUserPostsApi } from '../../shared/api/posts-api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/auth-selector';
import { selectToken } from '../../redux/slices/auth-selector';
import { getMyProfile } from '../../shared/api/myProfile-api';



// import { getUserPostsApi } from '../../shared/api/posts-api';

// export interface User { 
//     fullname: string;
//     username: string;
//     email: string;
//     role: "superadmin" | "admin" | "user";
//     biography?: string;
//     profilePhoto?: string;
//     followers: string[];
//     following: string[];
// }

export interface IPost { 
	_id: string;
	userId: string;
    text: string;
    photo: string;
    likesCount: number;
	commentsCount: number;
}

const UserProfilePage = () => {
	const { id } = useParams<{ id: string }>();
	const [user , setUser] = useState<User | null>(null);
	const [posts , setPosts] = useState<IPost[]>([]);
	const token = useSelector(selectToken)
const [currentUser , SetCurrentUser] = useState<User | null>(null)
	console.log("user", user)
	console.log("posts", posts)
	const authUser = useSelector(selectUser)
	console.log(authUser, "AuthUser")


	useEffect(() => {
		
		if (!id) return;

		const fetchUser = async () => {
			try {
				const data = await getUserByIdApi(id);

				setUser(data);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchPosts = async () => {
			try {
				const data = await getUserPostsApi(id);
				setPosts(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
		fetchPosts();
	}, [id]);

	useEffect(()=> {
		const fetchProfile = async() => {
			try {
				const user = await getMyProfile(token)
				SetCurrentUser(user)
			} catch (error) {
				console.log(error);
			}
		}
		if (token) {
			fetchProfile();
		}
	}, [token])

	 // Определяем владельца
  console.log(currentUser);
	

	return (
		<div className={styles.profilePageContainer}>
		 	<UserProfileInfo user={user} postsCount={posts.length} currentUserId={currentUser?._id} />
		 	<UserProfilePosts posts={posts} user={user} />
		</div>
	);
};

export default UserProfilePage;
