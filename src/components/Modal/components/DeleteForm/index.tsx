/* eslint-disable react/prop-types */
import React, { useCallback } from "react"
import { Dispatch } from "redux"
import { Product } from "models"
import { deleteProduct } from "store/products/actions"

type IProps = {
	dispatch: Dispatch<any>,
    close: () => void,
    product: Product
}

const DeleteForm: React.FunctionComponent<IProps> = ({ close, dispatch, product }) => {
    const onDelete = useCallback(() => {
		dispatch(deleteProduct(product.id))
		close()
    }, [product])

    return (
        <>
            <header className='modalBox__header'>
                Are you sure?
            </header>
            <p className='modalBox__message'>Are you want to perform this action?</p>
            <button onClick={onDelete}>Yes</button>
            <button onClick={close}>No</button>
        </>
    )
}

export default DeleteForm