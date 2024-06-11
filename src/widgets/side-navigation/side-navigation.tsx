"use client"

import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone"
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone"
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone"
import LogoutIcon from "@mui/icons-material/Logout"
import {
	Avatar,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { clearUser, useLogoutMutation } from "@entities/user"
import { useAppDispatch, useAppSelector } from "@shared/lib/store"

import { Wrapper } from "./side-navigation.styles"

export function SideNavigation() {
	const user = useAppSelector((state) => state.user.user)

	const [logout] = useLogoutMutation()

	const router = useRouter()

	const dispatch = useAppDispatch()

	const handleLogout = async () => {
		dispatch(clearUser())
		await logout().unwrap()
		router.replace("/login")
	}

	return (
		<Wrapper>
			<Drawer
				sx={{
					maxWidth: 240,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						maxWidth: 240,
						boxSizing: "border-box",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Divider />
				<List>
					<ListItem key="avatar" disablePadding>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText primary={user?.firstName} />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem key="modifications" disablePadding>
						<ListItemButton
							href="/dashboard/menu/modification-group"
							LinkComponent={Link}
						>
							<ListItemIcon>
								<AddCircleTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary="Группа модификации" />
						</ListItemButton>
					</ListItem>

					<ListItem key="menu" disablePadding>
						<ListItemButton href="/dashboard/menu" LinkComponent={Link}>
							<ListItemIcon>
								<AutoStoriesTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary="Меню" />
						</ListItemButton>
					</ListItem>

					<ListItem key="branches" disablePadding>
						<ListItemButton href="/dashboard/branches" LinkComponent={Link}>
							<ListItemIcon>
								<AddBusinessIcon />
							</ListItemIcon>
							<ListItemText primary="Филиал" />
						</ListItemButton>
					</ListItem>

					<ListItem key="delivery" disablePadding>
						<ListItemButton href="/dashboard/delivery-fee" LinkComponent={Link}>
							<ListItemIcon>
								<LocalShippingTwoToneIcon />
							</ListItemIcon>
							<ListItemText primary="Настройка доставки" />
						</ListItemButton>
					</ListItem>

					<ListItem key="logout" disablePadding>
						<ListItemButton onClick={handleLogout}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Выйти" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</Wrapper>
	)
}
