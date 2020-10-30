import { Product } from "models"

export const TYPES = {
	ADD_PRODUCT: "ADD_PRODUCT",
	EDIT_PRODUCT: "EDIT_PRODUCT",
	DELETE_PRODUCT: "DELETE_PRODUCT",
}

export const deleteProduct = (payload: number) => {
	return { type: TYPES.DELETE_PRODUCT, payload }
}

export const addProduct = (payload: Product) => {
	return { type: TYPES.ADD_PRODUCT, payload }
}

export const editProduct = (payload: Product) => {
	return { type: TYPES.EDIT_PRODUCT, payload }
}