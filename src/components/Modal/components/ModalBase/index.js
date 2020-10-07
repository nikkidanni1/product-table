import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

const ModalBase = ({ size, close, children }) => {
    return (
        ReactDOM.createPortal(
            <div className='modal__overlay'>
                <div className={`modalBox modalBox_size_${size}`}>
                    <div className='modalBox__cross' onClick={close} />
                    {children}
                </div>
            </div>,
            document.getElementById('portal')
        )
    )
}

export default ModalBase