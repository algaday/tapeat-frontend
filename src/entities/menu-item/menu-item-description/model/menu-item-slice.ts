import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { MenuItem } from "../api/types"
import { Modification, ModificationPayload } from "./types"

type MenuItemState = {
	menuItem: MenuItem | null
}

const initialState: MenuItemState = {
	menuItem: null,
}

export const menuSlice = createSlice({
	name: "menuItem",
	initialState,
	reducers: {
		addModificationRadioGroup: (
			state,
			{ payload }: PayloadAction<ModificationPayload>,
		) => {
			if (!state.menuItem) {
				return
			}

			if (!payload.prevModificationId) {
				state.menuItem.modifications.push(payload.modification)
				return
			}

			state.menuItem.modifications = state.menuItem.modifications.filter(
				(item) => item.id !== payload.prevModificationId,
			)

			state.menuItem.modifications.push(payload.modification)
		},

		addModificationCheckboxGroup: (
			state,
			{ payload }: PayloadAction<Modification>,
		) => {
			if (!state.menuItem) {
				return
			}

			const findModification = state.menuItem.modifications.find(
				(modification) => modification.id === payload.id,
			)

			if (!findModification) {
				state.menuItem.modifications.push(payload)
				return
			}

			const modifiedModifications = state.menuItem.modifications.filter(
				(modification) => modification.id !== payload.id,
			)

			state.menuItem.modifications = modifiedModifications
		},

		updateMenuItem: (state, { payload }: PayloadAction<MenuItem>) => {
			state.menuItem = payload
		},
	},
})

export const {
	addModificationRadioGroup,
	addModificationCheckboxGroup,
	updateMenuItem,
} = menuSlice.actions

export default menuSlice.reducer
