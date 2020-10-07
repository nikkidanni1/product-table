import React from 'react'

const DeleteForm = ({ close, onDelete }) => {
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