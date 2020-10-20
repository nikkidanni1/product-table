import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalBase from './components/ModalBase'
import DeleteForm from './components/DeleteForm'
import ModalForms from './components/ModalForms'
import ProductInfo from './components/ProductInfo'

const modals = {
    delete: DeleteForm,
    create: ModalForms,
    edit: ModalForms,
    view: ProductInfo
}

const Modal = ({ product, close }) => {
    const dispatch = useDispatch()
    const type = useSelector((state) => state.modal.mode)

    const SelectedModal = modals[type]
    
	return (
		<ModalBase size={type === 'delete' ? 's' : 'l'} close={close}>
            <SelectedModal close={close} dispatch={dispatch} product={product} />
		</ModalBase>
	)
}

export default React.memo(Modal)
