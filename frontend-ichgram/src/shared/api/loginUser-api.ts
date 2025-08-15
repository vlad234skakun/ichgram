import backendInstance from './instance';
import type { LoginPayloadType } from '../../pages/LoginPage/LoginPage';

export const verifyUserApi = async (code: string ) => {
	try {
    console.log("code", code);
    const { data } = await backendInstance.post("/auth/verify", { code });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error in verifyUserApi:", error);
    throw error; // пробросить дальше
  }
}

const loginUserApi = async(payload: LoginPayloadType) => {
		const {data} = await backendInstance.post("/auth/login" , payload)
		backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
		return data
	}

  export const getCurrentUserApi = async(token: string | null) => {
    if (!token) {
    throw new Error("No auth token found in getCurrentUserApi");
  }
    backendInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
        const {data} = await backendInstance.get("/auth/current");
        backendInstance.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        
        return data;
    }
    catch(error) {
        delete backendInstance.defaults.headers["Authorization"];
        throw error;
    }
  }

  export const logoutUserApi = async () => {
  try {
    const { data } = await backendInstance.post("/auth/logout");
    delete backendInstance.defaults.headers["Authorization"];
    return data;
  } catch (error) {
    console.error("Error in logoutUserApi:", error);
    throw error;
  }
};

// export const getMyProfile = async(token: string | null ) => {
//   if (!token) {
//     throw new Error("No auth token found in getMyProfile");
//   }
//   backendInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
// 	const { data } = await backendInstance.get('/me')
// 	return data;
// }

export default loginUserApi;
