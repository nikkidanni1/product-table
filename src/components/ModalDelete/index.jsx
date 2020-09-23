import React from 'react'
import ModalBase from 'components/ModalBase'

const ModalDelete = ({ close, onDelete }) => {
    return (
        <ModalBase size='s' close={close}>
            <header className='modalBox__header'>
                Are you sure?
            </header>
            <p className='modalBox__message'>Are you want to perform this action?</p>
            <button onClick={onDelete}>Yes</button>
            <button onClick={close}>No</button>
        </ModalBase>
    )
}

export default ModalDelete