export const TYPES = {
	ADD_PRODUCT: 'ADD_PRODUCT',
	EDIT_PRODUCT: 'EDIT_PRODUCT',
	DELETE_PRODUCT: 'DELETE_PRODUCT',
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