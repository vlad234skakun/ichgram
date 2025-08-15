import backendInstance from './instance';

import type { RegisterPayloadType } from '../../pages/RegisterPage/RegisterPage';

const addUserApi = async (payload: RegisterPayloadType) => {
	const {data} = await backendInstance.post("/auth/register", payload)
	return data
}

export default addUserApi;