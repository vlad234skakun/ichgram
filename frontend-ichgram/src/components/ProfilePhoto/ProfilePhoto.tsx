import type { FC } from 'react'
import styles from "./ProfilePhoto.module.css"
import defaultAvatar from "../../../public/defaultAvatar.svg";

const mediaUrl = import.meta.env.VITE_MEDIA_URL


interface ProfilePhotoProps { 
	profilePhoto?: string
}

const ProfilePhoto: FC<ProfilePhotoProps> = ({profilePhoto}) => {
	return ( 
		<div  className={styles.avatarBorder}>
			<img src={profilePhoto ? `${mediaUrl}/${profilePhoto}` : defaultAvatar} alt="Аватар" className={styles.avatarImage}/>
		</div>
		
	)
};

export default ProfilePhoto