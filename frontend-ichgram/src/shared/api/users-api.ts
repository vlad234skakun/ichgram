import backendInstance from './instance';

export const getAllUsersApi = async() => {
	const {data} = await backendInstance.get("/users/search")
	return data
}

export const getUserByIdApi = async (id: string) => { 
	const {data} = await backendInstance.get(`/users/${id}`)
	return data
}