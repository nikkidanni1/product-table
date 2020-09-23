import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from 'store/configureStore'

import Table from 'components/Table'
import TopPanel from 'components/TopPanel'
import ModalDelete from 'components/ModalDelete'
import ModalForms from 'components/ModalForms'

import 'App.scss'

function App({ products, deleteProductById }) {
	const [searchText, setSearchText] = useState('')
	const [isModalOpen, toggleModal] = useState(false)
	const [modalMode, setModalMode] = useState('')
	const [selectedProduct, setSelectedProduct] = useState(null)

	const onSearch = (text) => {
		setSearchText(text)
	}

	const onOpenModal = (type, product) => {
		toggleModal((prev) => !prev)
		setModalMode(type)
		setSelectedProduct(product)
	}

	const onCloseModal = () => {
		toggleModal(false)
	}

	const onDelete = () => {
		deleteProductById(selectedProduct.id)
		onCloseModal()
	}

	return (
		<div className='app'>
			<TopPanel search={onSearch} openModal={onOpenModal} />
			<Table productsProp={products.filter((item) => item.name.includes(searchText))} openModal={onOpenModal} />
			{(isModalOpen && modalMode === 'delete') && <ModalDelete close={onCloseModal} onDelete={onDelete} />}
			{isModalOpen && modalMode !== 'delete' && (
				<ModalForms close={onCloseModal} modalMode={modalMode} product={selectedProduct} />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteProductById: (id) => dispatch(deleteProduct(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
