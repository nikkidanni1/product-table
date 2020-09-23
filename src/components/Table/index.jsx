import React, { useState, useEffect } from 'react'

import './style.scss'

const Table = ({ productsProp = [] }) => {
	const [sort, setSort] = useState([
		{ sort: 'increase', name: 'price' },
		{ sort: 'increase', name: 'name' },
	])
	const [products, setProducts] = useState([])

	useEffect(() => {
		setProducts(productsProp)
		onSortProducts(sort, productsProp)
	}, [productsProp])

	const changeSortArray = (name) => {
		const sortArray = sort.slice().sort((item1, item2) => (item1.name === name ? 1 : item2.name === name ? -1 : 0))
		sortArray[sortArray.length - 1].sort = sortArray[sortArray.length - 1].sort === 'increase' ? 'decrease' : 'increase'
		return sortArray
	}

	const onSortProducts = (sortArray, productsForSort = products) => {
		const sortedProducts = productsForSort.slice()
		sortArray.forEach((item) => {
			switch (item.name) {
				case 'name':
					sortedProducts.sort((item1, item2) => {
						let res = item2.name > item1.name ? -1 : item2.name < item1.name ? 1 : 0
						if (item.sort === 'decrease') {
							res *= -1
						}
						return res
					})
					break
				case 'price':
					sortedProducts.sort((item1, item2) => {
						let res = item1.price - item2.price
						if (item.sort === 'decrease') {
							res *= -1
						}
						return res
					})
					break
				default:
			}
			setProducts(sortedProducts)
		})
	}

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
							onClick={() => {
								const sortArray = changeSortArray('name')
								setSort(sortArray)
								onSortProducts(sortArray)
							}}
						/>
					</th>
					<th className={`tableHeader__cell `}>
						Price
						<img
							className={`tableHeader__cellSort ${
								sort.filter((item) => item.name === 'price')[0].sort === 'increase'
									? ''
									: 'tableHeader__cellSort_decrease'
							}`}
							src='/images/sort.svg'
							alt='sort'
							onClick={() => {
								const sortArray = changeSortArray('price')
								setSort(sortArray)
								onSortProducts(sortArray)
							}}
						/>
					</th>
					<th className='tableHeader__cell'>Actions</th>
				</tr>
			</thead>
			<tbody>
				{products.map((item) => {
					const [integer, fractional] = item.price.toString().split('.')
					const formattedPrice = `$${integer
						.split('')
						.reverse()
						.join('')
						.replace(/([0-9]{3}(?=[0-9]))/g, '$1,')
						.split('')
                        .reverse()
						.join('')}${fractional !== undefined ? `.${fractional}` : ''}`
					return (
						<tr key={item.id}>
							<td className='tableBody__cell'>
								{item.name}
								<span className='tableBody__cellCount'>{item.count}</span>
							</td>
							<td className='tableBody__cell'>{formattedPrice}</td>
							<td className='tableBody__cell'>
								<button>Edit</button>
								<button>Delete</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default Table
