"use client"

import { useState } from "react"

import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone"
import LogoutIcon from "@mui/icons-material/Logout"
import {
	Avatar,
	Collapse,
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

import { StyledListItemButton, Wrapper } from "./side-navigation.styles"

export function SideNavigation() {
	const user = useAppSelector((state) => state.user.user)

	const [open, setOpen] = useState(false)

	const [logout] = useLogoutMutation()

	const router = useRouter()

	const dispatch = useAppDispatch()

	const handleLogout = async () => {
		dispatch(clearUser())
		await logout().unwrap()
		router.replace("/login")
	}

	const handleClick = () => {
		setOpen(!open)
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
					<ListItemButton onClick={handleClick}>
						<ListItemText primary="Настройка меню" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<ListItem key="menu" disablePadding>
							<StyledListItemButton href="/dashboard/menu" LinkComponent={Link}>
								<ListItemText primary="Меню" />
							</StyledListItemButton>
						</ListItem>

						<ListItem key="modifications" disablePadding>
							<StyledListItemButton
								href="/dashboard/menu/modification-group"
								LinkComponent={Link}
							>
								<ListItemText primary="Группа модификации" />
							</StyledListItemButton>
						</ListItem>

						<List component="div" disablePadding>
							<StyledListItemButton
								LinkComponent={Link}
								href="/dashboard/menu/category"
							>
								<ListItemText primary="Категория" />
							</StyledListItemButton>
						</List>
					</Collapse>

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
