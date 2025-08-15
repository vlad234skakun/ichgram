import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute/PrivateRoute'
import PublickRoute from './PublickRoute/PublickRoute'

import RegisterPage from './RegisterPage/RegisterPage'
import LoginPage from './LoginPage/LoginPage'
import ResetPasswordPage from './ResetPasswordPage/ResetPasswordPage'

import MainLayout from '../modules/Lauout/MainLayout'

// import HomePage from './HomePage/HomePage'
// import SearchPage from './SearchPage/SeacrhPage'
// import ExplorePage from './ExplorePage/ExplorePage'
// import MessagesPage from './MessagesPage/MessagesPage'
// import NotificationsPage from './NotificationsPage/NotificationsPage'
// import CreatePostPage from './CreatePost/CreatePost'
// import ProfilePage from './ProfilePage/ProfilePage'

import LearnMorePage from "./LearnMorePage/LearnMorePage";
import TermsPage from "./TermsPage/TermsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage/PrivacyPolicyPage";
import CookiesPolicyPage from "./CookiesPolicyPage/CookiesPolicyPage";

// import NotFoundPage from './NotFoundPage/NotFoundPage'

const Navigation = () => {
	return (
		<Routes>
			<Route element={<PublickRoute />}>
				<Route path='/' element={<LoginPage />} />
				<Route path='/signup' element={<RegisterPage />} />
				<Route path='/resetpassword' element={<ResetPasswordPage />} />
				<Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route path="/*" element={<MainLayout />} /> 
					{/* <Route path='/home' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />  
					<Route path='/explore' element={<ExplorePage />} />
					<Route path='/messages' element={<MessagesPage />} />
					<Route path='/notifications' element={<NotificationsPage />} />  
					<Route path='/createpost' element={<CreatePostPage />} /> 
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='*' element={<NotFoundPage/>} /> */}
			</Route>
		</Routes>
	)
}
export default Navigation
