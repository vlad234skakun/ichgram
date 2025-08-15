import backendInstance from './instance'

export const followUserApi = async(id: string) => {
	const { data } = await backendInstance.post(`/follow/${id}`)
	return data
}