/* eslint-disable react/prop-types */
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ModalMods, CombinedState, Product } from "models"
import ModalBase from "./components/ModalBase"
import DeleteForm from "./components/DeleteForm"
import ModalForms from "./components/ModalForms"
import ProductInfo from "./components/ProductInfo"

const modals = {
    delete: DeleteForm,
    create: ModalForms,
    edit: ModalForms,
    view: ProductInfo
}

type IProps = {
    product: Product,
    close: () =>  void
}

const Modal: React.FunctionComponent<IProps> = ({ product, close }) => {
    const dispatch = useDispatch()
    const type: ModalMods = useSelector((state: CombinedState) => state.modal.mode)

    const SelectedModal = modals[type]
    
	return (
		<ModalBase size={type === "delete" ? "s" : "l"} close={close}>
            <SelectedModal close={close} dispatch={dispatch} product={product} />
		</ModalBase>
	)
}

export default React.memo(Modal)
