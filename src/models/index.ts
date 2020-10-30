export type ActionType = {
    type: string,
    payload?: any
}

export type ModalState = { mode: string }

export type Product = {
    id?: number,
    name: string,
    email: string,
    count: number,
    price: number,
    country: string,
    city: Array<string>
}

export type ProductState = Array<Product>

export type CombinedState = { products: Array<Product>, modal: ModalState }