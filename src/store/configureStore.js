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
		case TYPES.ADD_PRODUCT: {
			return {
				...state,
				products: [...state.products, { ...action.payload, id: state.products[state.products.length - 1].id + 1 }],
			}
		}
		case TYPES.EDIT_PRODUCT: {
			const index = state.products.findIndex((item) => item.id === action.payload.id)
			const products = [...state.products]
			products[index] = action.payload
			return { ...state, products }
		}
		case TYPES.DELETE_PRODUCT: {
			const index = state.products.findIndex((item) => item.id === action.payload)
			const products = [...state.products.slice(0, index), ...state.products.slice(index + 1, state.products.lenght)]
			return { ...state, products }
		}
		default:
			return state
	}
}

export const deleteProduct = (payload) => {
	return { type: TYPES.DELETE_PRODUCT, payload }
}

export const addProduct = (payload) => {
	return { type: TYPES.ADD_PRODUCT, payload }
}

export const editProduct = (payload) => {
	return { type: TYPES.EDIT_PRODUCT, payload }
}

const configureStore = () => {
	const store = createStore(reducer, initState)
	return store
}

export default configureStore
