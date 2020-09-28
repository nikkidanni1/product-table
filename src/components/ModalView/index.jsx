import React from 'react'
import ModalBase from 'components/ModalBase'
import { formatPrice } from 'utils'

import './style.scss'

const ModalView = ({ close, product }) => {

	return (
        <ModalBase size='l' close={close}>
            <p className='viewLine'>{`Name: ${product.name}`}</p>
            <p className='viewLine'>{`Email: ${product.email}`}</p>
            <p className='viewLine'>{`Count: ${product.count}`}</p>
            <p className='viewLine'>{`Price: ${formatPrice(product.price)}`}</p>
            <p className='viewLine'>{`Delivery: ${product.city.length !== 0}`}</p>
            <p className='viewLine'>{`Country: ${product.country ? product.country : '-'}`}</p>
            <p className='viewLine'>{`City: ${product.city.length !== 0 ? product.city.join(', ') : '-'}`}</p>
        </ModalBase>
    )
}

export default ModalView
