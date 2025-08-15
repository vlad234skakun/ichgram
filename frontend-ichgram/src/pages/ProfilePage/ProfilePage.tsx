import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/auth-selector'
import { getMyPostsApi } from '../../shared/api/posts-api'
import { getMyProfile } from '../../shared/api/myProfile-api'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import ProfilePosts from '../../components/ProfilePosts/ProfilePosts'
import styles from "./ProfilePage.module.css"
import { selectUser } from '../../redux/slices/auth-selector'

export interface User { 
		_id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: "superadmin" | "admin" | "user";
    token?: string;
    verificationCode?: string;
    verify: boolean;
    biography?: string;
    profilePhoto?: string;
    followers: string[];
    following: string[];
}

export interface IPost { 
	_id: string
	userId: string;
  text: string;
  photo: string;
  likesCount: number;
	commentsCount: number;
}


const ProfilePage = () => {
	const token = useSelector(selectToken)
	const [user , setUser] = useState<User | null>(null)
	const [posts , setPosts] = useState<IPost[] | null>(null)
	const authUser = useSelector(selectUser);

  // isOwner вычисляется только если оба пользователя загружены
  // const isOwner = user && authUser ? authUser.username === user.username : false;
	// console.log(isOwner)


	// const postsCount = posts?.length
	
useEffect(()=> {
	const fetchProfile = async() => {
		try {
			const user = await getMyProfile(token)
			setUser(user)
		} catch (error) {
			console.log(error);
		}
	}
	if (token) {
    fetchProfile();
  }
}, [token])

useEffect(()=> {
	const fetchProfilePosts = async() => {
		try {
			const posts = await getMyPostsApi()
			setPosts(posts)
		} catch (error) {
			console.log(error);
		}
	}
	if (token) {
    fetchProfilePosts();
  }
}, [token])


	const postsCount = posts?.length

	return (
		<div className={styles.profilePageContainer} >
		<ProfileInfo user={user} postsCount={posts ? postsCount : 0}/>
		<ProfilePosts posts={posts} user={user}  />
		</div>
		
		
	)
};

export default ProfilePage;