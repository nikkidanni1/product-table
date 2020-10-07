import React from 'react'
import { formatPrice } from 'utils'

import './style.scss'

const ProductInfo = ({ product }) => {
	return (
        <>
            <p className='viewLine'>{`Name: ${product.name}`}</p>
            <p className='viewLine'>{`Email: ${product.email}`}</p>
            <p className='viewLine'>{`Count: ${product.count}`}</p>
            <p className='viewLine'>{`Price: ${formatPrice(product.price)}`}</p>
            <p className='viewLine'>{`Delivery: ${product.city.length !== 0}`}</p>
            <p className='viewLine'>{`Country: ${product.country ? product.country : '-'}`}</p>
            <p className='viewLine'>{`City: ${product.city.length !== 0 ? product.city.join(', ') : '-'}`}</p>
        </>
    )
}

export default ProductInfo
