import backendInstance from './instance';

import type { EditProfileFormValues } from '../../pages/EditProfile/EditProfile';



export const getMyProfile = async(token: string | null ) => {
	if (!token) {
		throw new Error("No auth token found in getMyProfile");
	}
	backendInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
	const { data } = await backendInstance.get('/me')
	return data;
}

export const UpdateMyProfilePhoto = async(formData: any) => { 
	const {data} = await backendInstance.put("/me/update-photo", formData, 
					{headers: {
            "Content-Type": "multipart/form-data"
          		}
        	})
					return data
}

export const UpdateInfoProfile = async(payload: EditProfileFormValues) => { 
	const {data} = await backendInstance.put("/me/update-profileinfo", payload)
	return data
}