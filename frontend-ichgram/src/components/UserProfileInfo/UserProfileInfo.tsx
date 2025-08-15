import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import Button from '../Button/Button';
import type { User } from '../../pages/ProfilePage/ProfilePage';
import type { FC } from 'react';
import styles from "./UserProfileInfo.module.css"
import { useState } from 'react';
import { followUserApi } from '../../shared/api/follow-api';



interface ProfileInfoProps { 
	user: User | null;
	postsCount: number | undefined;
	currentUserId: string | undefined
	
}

const UserProfileInfo: FC<ProfileInfoProps> = ({user , postsCount , currentUserId}) => {
	if (!user) return <div>Loading...</div>;
	const [isFollowing, setIsFollowing] = useState(
  user.followers?.some(f => f === currentUserId) ?? false
);
	console.log(isFollowing);
	
	const [followersCount, setFollowersCount] = useState(user.followers?.length ?? 0);
	// const countFollowers = user.followers?.length ?? 0
	const countFollowing = user.following?.length ?? 0
	console.log(isFollowing)
	const handleFollow = async() => {
		if (!user) return;
		try {
			const result = await followUserApi(user._id); // токен не нужен, летит вместе с request
			console.log("подписался", result)
			setIsFollowing(true);
			setFollowersCount(result.targetUser.followersCount); // обновляем количество подписчиков
		} catch (err) {
			console.error(err);
		}
	}


	
	return ( 
		<>
		<div className={styles.profileInfoContainer} >
			<ProfilePhoto profilePhoto={user.profilePhoto} />
				<div className={styles.profileInfoBox} >
					<div className={styles.titleBox} >
						{user && <h1 className={styles.title} >{user.username}</h1>}
						
						<div className={styles.buttonWrapper} >
      				{isFollowing ? (
							<Button variant="secondary">Following</Button>
						) : (
							<Button variant="primery" onClick={handleFollow}>Follow</Button>
						)}
      				<Button variant="secondary">Message</Button>
						</div>
					</div>
						<div className={styles.info} >
							<p><span>{postsCount}</span>Posts</p>
							<p><span>{followersCount}</span>followers</p>
							<p><span>{countFollowing}</span>following</p>
						</div>
						<div className={styles.biography} >
								{user.biography}
						</div>
				</div>
		</div>
		</>
	)
};

export default UserProfileInfo