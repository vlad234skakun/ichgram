import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectToken } from '../../redux/slices/auth-selector'

const PrivateRoute = () => {

	const token = useSelector(selectToken)
	console.log("PrivateRoter:", token)

	if (!token) return <Navigate to={"/"} />

	return <Outlet />


}
export default PrivateRoute