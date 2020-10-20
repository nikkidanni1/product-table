import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const TableBase = ({ children, sort, onSortByName, onSortByPrice }) => {
	
	return (
		<table className='table'>
			<thead>
				<tr>
					<th className='tableHeader__cell'>
						Name
						<img
							className={`tableHeader__cellSort ${
								sort.filter((item) => item.name === 'name')[0].sort === 'increase'
									? ''
									: 'tableHeader__cellSort_decrease'
							}`}
							src='/images/sort.svg'
							alt='sort'
							onClick={onSortByName}
						/>
					</th>
					<th className={`tableHeader__cell`}>
						Price
						<img
							className={`tableHeader__cellSort ${
								sort.filter((item) => item.name === 'price')[0].sort === 'increase'
									? ''
									: 'tableHeader__cellSort_decrease'
							}`}
							src='/images/sort.svg'
							alt='sort'
							onClick={onSortByPrice}
						/>
					</th>
					<th className='tableHeader__cell'>Actions</th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	)
}

TableBase.propTypes = {
	productsProp: PropTypes.array,
	openModal: PropTypes.func,
}

export default React.memo(TableBase)
