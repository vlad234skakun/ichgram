import styles from "./EditProfile.module.css"
import defaultAvatar from "../../../public/defaultAvatar.svg"
import { useEffect, useState, useRef} from 'react'
import { getMyProfile } from '../../shared/api/myProfile-api'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/auth-selector'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { UpdateMyProfilePhoto } from '../../shared/api/myProfile-api'
import { UpdateInfoProfile } from '../../shared/api/myProfile-api'
import type { AppDispatch } from "../../redux/store";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logout } from '../../redux/slices/auth-slice'


const mediaUrl = import.meta.env.VITE_MEDIA_URL


export interface User { 
    _id?: string; 
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

export interface EditProfileFormValues {
  username: string;
  website: string;
  biography: string;
}


const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
	const [user , setUser] = useState<User | null>(null)
	const token = useSelector(selectToken)
	 const fileInputRef = useRef<HTMLInputElement | null>(null)

	const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    // defaultValues: {
    //   username: "",
    //   website: "",
    //   about: "",
    // },
  });

useEffect(()=> {
	const fetchProfile = async() => {
		try {
			const user = await getMyProfile(token)
			setUser(user)
			reset({
          username: user.username || "",
          website: user.website || "",
          biography: user.biography || "",
        });
		} catch (error) {
			console.log(error);
		}
	}
	if (token) {
		fetchProfile();
	}
}, [token])

 const onSubmit = async(payload: EditProfileFormValues) => {
    console.log("Form data:", payload);
    try {
      const updatedUser = await UpdateInfoProfile(payload)
      setUser(updatedUser);
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
    // тут можно сделать запрос на обновление профиля
  };


const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	 const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("profilePhoto", file)
		try {
			const data = await UpdateMyProfilePhoto(formData)
			setUser((prev) => prev ? { ...prev, profilePhoto: data.profilePhoto } : prev)
		} catch (error) {
			console.error("Ошибка при загрузке фото:", error)
		}
		
  }

	const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleLogoutClick = () => {
    dispatch(logout())
    navigate("/")
  }

	 return (
    <div className={styles.container}>
      <h2 className={styles.titlePage}>Edit profile</h2>
      <div className={styles.profileBlock}>
        <div className={styles.box}>
          <div className={styles.avatarBox}>
            <img
              src={user?.profilePhoto ? `${mediaUrl}/${user.profilePhoto}` : defaultAvatar}
              alt="User avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileDescription}>
            <p className={styles.username}>{user?.username}</p>
            <p className={styles.fullName}>{user?.biography}</p>
          </div>
        </div>

        <div className={styles.btnBox}>
          {/* <Button
            text="New photo"
            onClick={() => setShowPhotoUploader((prev) => !prev)}
          /> */}
					<Button variant='primery' type='button' onClick={handleButtonClick} >New Foto</Button>
					 <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
					{/* <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          /> */}
        </div>
      </div>

 <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* UserName */}
      <label className={styles.label}>UserName</label>
      <input
        className={styles.input}
        {...register("username", { required: "Username is required" })}
        placeholder="Enter your username"
      />
      {errors.username && (
        <span className={styles.error}>{errors.username.message}</span>
      )}

      {/* Website */}
      <label className={styles.label}>Website</label>
      <input
        className={styles.input}
        type="url"
        {...register("website", {
          pattern: {
            value: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/,
            message: "Enter a valid URL",
          },
        })}
        placeholder="https://example.com"
      />
      {errors.website && (
        <span className={styles.error}>{errors.website.message}</span>
      )}

      {/* About */}
      <label className={styles.label}>About</label>
      <textarea
        className={styles.textarea}
        {...register("biography")}
        placeholder="Write something about yourself..."
      />
			<Button variant='primery' path="/profile" type='submit'>Save Changes</Button>
      
    </form>
     <Button
        variant="secondary"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </div>
  );
};
export default EditProfile