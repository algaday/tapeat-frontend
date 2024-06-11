"use client"

import { useState } from "react"

import { NavigationList } from "@/shared/ui/navigation-list/navigation-list"
import MenuIcon from "@mui/icons-material/Menu"
import { Drawer } from "@mui/material"

import { StyledIconButton } from "./navigation.styles"

export function Navigation() {
	const [navigationModal, setNavigationModal] = useState(false)

	const toggleDrawer = (modal: boolean) => () => {
		setNavigationModal(modal)
	}
	return (
		<>
			<StyledIconButton onClick={toggleDrawer(true)} disableRipple>
				<MenuIcon />
			</StyledIconButton>

			<Drawer open={navigationModal} onClose={toggleDrawer(false)}>
				<NavigationList toggleDrawer={toggleDrawer(false)} />
			</Drawer>
		</>
	)
}
