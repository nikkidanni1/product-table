import { TYPES } from 'store/products/actions'
import products from 'data/data.json'

const initState = [...products]

export const productReducer = (state = initState, action) => {
	switch (action.type) {
		case TYPES.ADD_PRODUCT: {
			return [...state, { ...action.payload, id: state[state.length - 1].id + 1 }]
		}
		case TYPES.EDIT_PRODUCT: {
			const index = state.findIndex((item) => item.id === action.payload.id)
			const products = [...state]
			products[index] = action.payload
			return products
		}
		case TYPES.DELETE_PRODUCT: {
			const index = state.findIndex((item) => item.id === action.payload)
			const products = [...state.slice(0, index), ...state.slice(index + 1, state.lenght)]
			return products
		}
		default:
			return state
	}
}
