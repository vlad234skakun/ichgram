import backendInstance from './instance'

export const addMyPostsApi = async(payload: any) => {
	console.log("addMyPostsApi FORMDATA",payload);
	
	const {data} = await backendInstance.post("/posts/addpost", payload , {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			return data
}

export const getMyPostsApi = async() => { 
	const {data} = await backendInstance.get("/posts/myposts")
	return data
}

export const getUserPostsApi = async(id: string) => {
	
	const {data} = await backendInstance.get(`/posts/${id}`)
	return data
}

export const getAllPostsApi = async() => {
	const { data } = await backendInstance.get("/posts/all"); // backend endpoint
  return data;
}

export const likeToggle = async (postId: string) => { 
  const { data } = await backendInstance.post(`/likes/${postId}/toggle`);
  return data;
};

export const getLikeInfo = async (postId: string) => {
	const { data } = await backendInstance.get(`/likes/${postId}/status`)
	return data as { liked: boolean; count: number };
	return data
}

export const deletePost = async(postId: string) => { 
	const { data } = await backendInstance.delete(`/posts/${postId}/delete`)
	return data
}

export const addComment = async(postId: string, text: string) => {
	const { data } = await backendInstance.post(`/comments/${postId}/addcomment`, { text })
	return data
}

export const getComments = async(postId: string) => {	
const {data} = await backendInstance.get(`/comments/${postId}/getcomments`)
return data
}
