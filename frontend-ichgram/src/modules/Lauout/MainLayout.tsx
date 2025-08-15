import type { Location } from 'react-router-dom'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Drawer from '../../components/Drawer/Drawer.tsx'
import CreatePostPage from '../../pages/CreatePost/CreatePost.tsx'
import ExplorePage from '../../pages/ExplorePage/ExplorePage.tsx'
import HomePage from '../../pages/HomePage/HomePage.tsx'
import MessagesPage from '../../pages/MessagesPage/MessagesPage.tsx'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.tsx'
import EditProfile from '../../pages/EditProfile/EditProfile.tsx'
import NotificationsPage from '../../pages/NotificationsPage/NotificationsPage.tsx'
import ProfilePage from '../../pages/ProfilePage/ProfilePage.tsx'
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage.tsx'
import SearchPage from '../../pages/SearchPage/SeacrhPage.tsx'
import Footer from '../Footer/Footer'
import styles from "./MainLayout.module.css"
import SideBar from './SideBar/SideBar.tsx'


const MainLayout = () => {
	const navigate = useNavigate()
const location = useLocation();
const state = location.state as { backgroundLocation?: Location };
const backgroundLocation = state?.backgroundLocation;
console.log(state);

	return ( 
		<>
		<div className={styles.layout} >
			<aside className={styles.sidebar} >
				<SideBar />
			</aside>
			<main className={styles.main} >
				<Routes location={backgroundLocation || location}>
					<Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/home' element={<HomePage />} />
					<Route path='/search' element={<SearchPage />} />  
					<Route path='/explore' element={<ExplorePage />} />
					<Route path='/messages' element={<MessagesPage />} />
					<Route path='/notifications' element={<NotificationsPage />} />  
					<Route path='/createpost' element={<CreatePostPage />} /> 
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/user/:id' element={<UserProfilePage/>} />
					<Route path='*' element={<NotFoundPage/>} />
          </Routes>
				{backgroundLocation && (
            <Routes>
              <Route
                path="/search"
                element={
                  <Drawer onClose={() => navigate(-1)}>
                    <SearchPage />
                  </Drawer>
                }
              />
              <Route
                path="/notifications"
                element={
                  <Drawer onClose={() => navigate(-1)}>
                    <NotificationsPage />
                  </Drawer>
                }
              />
            </Routes>
          )}
			</main> 
		</div>
		<div className={styles.footer} >
			<Footer />
		</div>
		
		</>
		
	)
};

export default MainLayout;