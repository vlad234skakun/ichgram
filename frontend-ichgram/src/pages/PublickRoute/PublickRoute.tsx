import { useSelector } from 'react-redux'
import {Outlet, Navigate } from 'react-router-dom'
import { selectToken } from '../../redux/slices/auth-selector'

const PublickRoute = () => {
	// нужно сделать функцию для проверки токена, в конце отобразить outlet

	const token: string | null = useSelector(selectToken)

	if (token) return <Navigate to={"/home"} />

	return <Outlet />

}

export default PublickRoute