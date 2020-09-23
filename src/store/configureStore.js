import { createStore } from 'redux'
import products from 'data/data.json'

const initState = { products }

const TYPES = {
	ADD_PRODUCT: 'ADD_PRODUCT',
	EDIT_PRODUCT: 'EDIT_PRODUCT',
	DELETE_PRODUCT: 'DELETE_PRODUCT',
}

function reducer(state, action) {
	switch (action.type) {
		case TYPES.ADD_PRODUCT:
			return { ...state }
		case TYPES.EDIT_PRODUCT:
			return { ...state }
		case TYPES.DELETE_PRODUCT:
			const index = state.products.findIndex((item) => item.id === action.payload)
			const products = [...state.products.slice(0, index), ...state.products.slice(index + 1, state.products.lenght)]
			return { ...state, products }
		default:
			return state
	}
}

export const deleteProduct = (payload) => {
	return { type: TYPES.DELETE_PRODUCT, payload }
}

const configureStore = () => {
    const store = createStore(reducer, initState)
    return store
}

export default configureStore