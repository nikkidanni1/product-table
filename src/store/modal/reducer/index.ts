import { ActionType, ModalState } from "models"
import { TYPES } from "store/modal/actions"

const initState: ModalState = { mode: "" }

export const modalReducer = (state: ModalState = initState, action: ActionType) => {
	switch (action.type) {
		case TYPES.CHANGE_MODE: {
			return {
				...state,
				mode: action.payload,
			}
		}
		default:
			return state
	}
}
