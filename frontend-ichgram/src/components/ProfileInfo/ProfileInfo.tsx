import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import Button from '../Button/Button';
import type { User } from '../../pages/ProfilePage/ProfilePage';
import type { FC } from 'react';
import styles from "./ProfileInfo.module.css"



interface ProfileInfoProps { 
	user: User | null;
	postsCount: number | undefined;
	
}

const ProfileInfo: FC<ProfileInfoProps> = ({user , postsCount}) => {
	if (!user) return <div>Loading...</div>;
	const countFollowers = user.followers?.length ?? 0
	const countFollowing = user.following?.length ?? 0

	
	return ( 
		<>
		<div className={styles.profileInfoContainer} >
			<ProfilePhoto profilePhoto={user.profilePhoto} />
				<div className={styles.profileInfoBox} >
					<div className={styles.titleBox} >
						{user && <h1 className={styles.title} >{user.username}</h1>}
						
						<div className={styles.buttonWrapper} >

						<Button variant='secondary' path="/edit-profile" type='button'>Edit Profile</Button>
						</div>
					</div>
						<div className={styles.info} >
							<p><span>{postsCount}</span>Posts</p>
							<p><span>{countFollowers}</span>followers</p>
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

export default ProfileInfo