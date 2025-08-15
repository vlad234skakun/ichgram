import HomeIcon from '../../../../components/navIconsComponent/HomeIcon'
import SearchIcon from '../../../../components/navIconsComponent/SearchIcon'
import ExploreIcon from '../../../../components/navIconsComponent/ExploreIcon'
import MessagesIcon from '../../../../components/navIconsComponent/MessagesIcon'
import NotificationsIcon from '../../../../components/navIconsComponent/NotificationsIcon'
import CreatePostIcon from '../../../../components/navIconsComponent/CreatePostIcon'

import type { FC, SVGProps } from 'react'

export interface ISideBarItems { 
	id: number;
	text: string;
	href: string;
	icon: FC<SVGProps<SVGSVGElement>> | string;
	type?: string
}

const SideBarItems: ISideBarItems[] = [
	{
		id: 1,
		text: "Home" ,
		href: "/home",
		icon: HomeIcon,
		type: "link"
		
	},
	{
		id: 2,
		text: "Search" ,
		href: "/search",
		icon: SearchIcon,
		type: "drawer"


	},
	{
		id: 3,
		text: "Explore" ,
		href: "/explore",
		icon: ExploreIcon,
		type: "link"
	},
	{
		id: 4,
		text: "Messages" ,
		href: "/messages",
		icon: MessagesIcon,
		type: "link" 
	},
	{
		id: 5,
		text: "Notification" ,
		href: "/notifications",
		icon: NotificationsIcon,
		type: "drawer"
	},
	{
		id: 6,
		text: "Create" ,
		href: "/createpost",
		icon: CreatePostIcon,
		type: "link"
	},
	{
		id: 7,
		text: "Profile" ,
		href: "/profile",
		icon: 'HomeIcon'

	},
]

export default SideBarItems