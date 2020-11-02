import * as React from "react"
import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "redux"

import { Product, CombinedState } from "models"

import { changeMode } from "store/modal/actions"

import Table from "components/Table"
import TopPanel from "components/TopPanel"
import Modal from "components/Modal"

import "App.scss"

const App: React.FunctionComponent<{}> = () => {
	const [searchText, setSearchText] = useState<string>("")
	const [isModalOpen, toggleModal] = useState<boolean>(false)
	const [selectedProduct, setSelectedProduct] = useState<Product>(null)

	const dispatch: Dispatch<any> = useDispatch()

	const products = useSelector((state: CombinedState) => state.products)
	const filtredProducts: Array<Product> = products.filter((item: Product) => item.name.includes(searchText))

	const onSearch = useCallback((text: string) => {
		setSearchText(text)
	}, [])

	const onOpenModal = useCallback((type: string, product: Product) => {
		toggleModal(true)
		dispatch(changeMode(type))
		setSelectedProduct(product)
	}, [])

	const onCloseModal = useCallback(() => {
		toggleModal(false)
	}, [])

	return (
		<div className='app'>
			<TopPanel search={onSearch} openModal={onOpenModal} />
			<Table productsProp={filtredProducts} openModal={onOpenModal} />
			{isModalOpen && <Modal close={onCloseModal} product={selectedProduct} />}
		</div>

	)
}

export default App
