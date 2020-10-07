import { TYPES } from 'store/modal/actions'

const initState = { mode: '' }

export const modalReducer = (state = initState, action) => {
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
