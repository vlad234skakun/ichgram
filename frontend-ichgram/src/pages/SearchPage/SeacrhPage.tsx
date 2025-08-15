import { useState } from 'react'
import styles from "./SearchPage.module.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsersApi } from '../../shared/api/users-api';
import type { User } from '../EditProfile/EditProfile';
import defaultAvatar from "../../../public/defaultAvatar.svg";

const mediaUrl = import.meta.env.VITE_MEDIA_URL;



const SearchPage = () => {
const [query , setQuery] = useState<string>("")
const [users, setUsers] = useState<User[]>([])
console.log(users)

useEffect(() => {
  const fetchUsers = async () => {
    const data = await getAllUsersApi(); // твой API
    setUsers(data);
  };
  fetchUsers();
}, []);

const filteredUsers = users.filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()));

	return (
		<>
		<h1 className={styles.text} >Search</h1>
		<form className={styles.inputForm} action="">
			<input className={styles.input} type="search" placeholder='Search' value={query} onChange={(e)=> setQuery(e.target.value)}  />
			
		</form>
		<div className={styles.results}>
				{query && <h1 className={styles.topText} >Recent</h1>}
        {query && filteredUsers.map((user) => (
					
          <Link key={user._id} to={`/user/${user._id}`} className={styles.userCard}>
						<div className={styles.resultsContainer} >
            <div className={styles.avatarBorder}>
        			<img src={user.profilePhoto ? `${mediaUrl}/${user.profilePhoto}`: defaultAvatar} alt="Post" 
							className={styles.avatarImage} />
      			</div>
						<div className={styles.descriptionTextContainer} ><h1 className={styles.username}>{user.username}</h1>
            </div>
						</div>
          </Link>
        ))}
      </div>
		</>
	)
};

export default SearchPage