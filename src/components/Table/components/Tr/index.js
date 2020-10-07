import React, { useCallback } from 'react'

import { formatPrice } from 'utils'

import './style.scss'

const Tr = ({ product, onView, onEdit, onDelete }) => {
    const formattedPrice = formatPrice(product.price)

    const onViewProduct = useCallback(() => {
        onView(product)
    }, [product])

    const onEditProduct = useCallback(() => {
        onEdit(product)
    }, [product])

    const onDeleteProduct = useCallback(() => {
        onDelete(product)
    }, [product])
	
	return (
		<tr>
			<td className='tableBody__cell'>
				<a className='tableBody__a' onClick={onViewProduct}>
					{product.name}
				</a>
				<span className='tableBody__cellCount'>{product.count}</span>
			</td>
			<td className='tableBody__cell'>{formattedPrice}</td>
			<td className='tableBody__cell'>
				<button onClick={onEditProduct}>Edit</button>
				<button onClick={onDeleteProduct}>Delete</button>
			</td>
		</tr>
	)
}

export default React.memo(Tr)
