import React from 'react'
import { formatPrice } from 'utils'

import './style.scss'

const TableRowView = ({ onView, name, count, price, onEdit, onDelete }) => {
	const formattedPrice = formatPrice(price)

	return (
		<tr>
			<td className='tableBody__cell'>
				<a className='tableBody__a' onClick={onView}>
					{name}
				</a>
				<span className='tableBody__cellCount'>{count}</span>
			</td>
			<td className='tableBody__cell'>{formattedPrice}</td>
			<td className='tableBody__cell'>
				<button onClick={onEdit}>Edit</button>
				<button onClick={onDelete}>Delete</button>
			</td>
		</tr>
	)
}

export default React.memo(TableRowView)
