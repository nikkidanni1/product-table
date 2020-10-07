import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeMode } from 'store/modal/actions'

import Table from 'components/Table'
import TopPanel from 'components/TopPanel'
import Modal from 'components/Modal'

import 'App.scss'

function App() {
	const [searchText, setSearchText] = useState('')
	const [isModalOpen, toggleModal] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	const dispatch = useDispatch()

	const products = useSelector((state) => state.products)
	const filtredProducts = products.filter((item) => item.name.includes(searchText))

	const onSearch = useCallback((text) => {
		setSearchText(text)
	}, [])

	const onOpenModal = useCallback((type, product) => {
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
