export type ActionType = {
    type: string,
    payload?: any
}

export enum ModalMods {
    delete = "delete",
    create = "create",
    edit = "edit",
    view = "view"
}

export type ModalState = { mode: ModalMods }

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

export enum SortFields {
    name = "name",
    price = "price"
}

export type Sort = { sort: string, name: SortFields }