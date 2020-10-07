import React, { useState, useEffect, useCallback } from 'react'

import TableBase from './components/TableBase'
import Tr from './components/Tr'

import { sortByFields } from './utils'

import './style.scss'

const Table = ({ productsProp = [], openModal }) => {
	const [sort, setSort] = useState([
		{ sort: 'increase', name: 'price' },
		{ sort: 'increase', name: 'name' },
	])
	const [products, setProducts] = useState(productsProp)

	useEffect(() => {
		if (productsProp !== products) {
			setProducts(productsProp)
			setProducts(sortByFields(sort, productsProp))
		}
	}, [productsProp])

	const toggleSortArray = useCallback(
		(name) => {
			const sortArray = sort.slice().sort((item1, item2) => (item1.name === name ? 1 : item2.name === name ? -1 : 0))
			sortArray[sortArray.length - 1].sort =
				sortArray[sortArray.length - 1].sort === 'increase' ? 'decrease' : 'increase'
			return sortArray
		},
		[sort]
	)

	const onSortByName = useCallback(() => {
		const sortArray = toggleSortArray('name')
		setSort(sortArray)
		setProducts(sortByFields(sortArray, products))
	}, [products])

	const onSortByPrice = useCallback(() => {
		const sortArray = toggleSortArray('price')
		setSort(sortArray)
		setProducts(sortByFields(sortArray, products))
	}, [products])

	const onDelete = useCallback((product) => {
		openModal('delete', product)
	}, [])

	const onEdit = useCallback((product) => {
		openModal('edit', product)
	}, [])

	const onView = useCallback((product) => {
		openModal('view', product)
	}, [])
	
	return (
		<TableBase sort={sort} onSortByName={onSortByName} onSortByPrice={onSortByPrice}>
			{products.map((item) => {
				return <Tr key={item.id} product={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
			})}
		</TableBase>
	)
}

export default React.memo(Table)
