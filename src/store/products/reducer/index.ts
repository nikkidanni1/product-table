import { ActionType, Product, ProductState } from "models"
import { TYPES } from "store/products/actions"
import products from "data/data.json"

const initState = [...products]

export const productReducer = (state: ProductState = initState, action: ActionType) => {
	switch (action.type) {
		case TYPES.ADD_PRODUCT: {
			return [...state, { ...action.payload, id: state[state.length - 1].id + 1 }]
		}
		case TYPES.EDIT_PRODUCT: {
			const index: number = state.findIndex((item) => item.id === action.payload.id)
			const products: Array<Product> = [...state]
			products[index] = action.payload
			return products
		}
		case TYPES.DELETE_PRODUCT: {
			const index: number = state.findIndex((item) => item.id === action.payload)
			const products: Array<Product> = [...state.slice(0, index), ...state.slice(index + 1, state.length)]
			return products
		}
		default:
			return state
	}
}
