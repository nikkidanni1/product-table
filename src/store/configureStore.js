import { createStore, combineReducers } from 'redux'

import { productReducer } from 'store/products/reducer'
import { modalReducer } from 'store/modal/reducer'

const reducer = combineReducers({ products: productReducer, modal: modalReducer })

const configureStore = () => {
	const store = createStore(reducer)
	return store
}

export default configureStore
