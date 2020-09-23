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
			return { ...state }
		default:
			return state
	}
}

const configureStore = () => {
    const store = createStore(reducer, initState)
    return store
}

export default configureStore