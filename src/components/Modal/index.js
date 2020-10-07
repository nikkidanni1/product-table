import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteProduct, addProduct, editProduct } from 'store/products/actions'

import ModalBase from './components/ModalBase'
import DeleteForm from './components/DeleteForm'
import ModalForms from './components/ModalForms'
import ProductInfo from './components/ProductInfo'

const Modal = ({ product, close }) => {
    const dispatch = useDispatch()
    const type = useSelector((state) => state.modal.mode)

	const onDelete = useCallback(() => {
		dispatch(deleteProduct(product.id))
		close()
    }, [product])
    
    const onAddProduct = useCallback((payload) => {
        dispatch(addProduct(payload))
        close()
    }, [])

    const onEditProduct = useCallback((payload) => {
        dispatch(editProduct(payload))
        close()
    }, [])
    
	return (
		<ModalBase size={type === 'delete' ? 's' : 'l'} close={close}>
			{type === 'delete' && <DeleteForm close={close} onDelete={onDelete} />}
			{(type === 'create' || type === 'edit') && (
				<ModalForms close={close} addProduct={onAddProduct} editProduct={onEditProduct} product={product} />
			)}
            {type === 'view' && <ProductInfo close={close} product={product} />}
		</ModalBase>
	)
}

export default (Modal)
