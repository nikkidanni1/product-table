/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react"

import { Product, Sort, SortFields } from "models"

import TableBase from "./components/TableBase"
import TableRow from "./components/TableRow"

import { sortByFields } from "./utils"

import "./style.scss"

type IProps = {
	productsProp: Array<Product>,
	openModal: (type: string, product: Product) => void,
}

const Table: React.FunctionComponent<IProps> = ({ productsProp = [], openModal }) => {
	const [sort, setSort] = useState<Array<Sort>>([
		{ sort: "increase", name: SortFields.price },
		{ sort: "increase", name: SortFields.name },
	])
	const [products, setProducts] = useState<Array<Product>>(productsProp)

	useEffect(() => {
		if (productsProp !== products) {
			setProducts(productsProp)
			setProducts(sortByFields(sort, productsProp))
		}
	}, [productsProp])

	const toggleSortArray = useCallback(
		(name: SortFields) => {
			const sortArray = sort.slice().sort((item1: Sort, item2: Sort) => (item1.name === name ? 1 : item2.name === name ? -1 : 0))
			sortArray[sortArray.length - 1].sort =
				sortArray[sortArray.length - 1].sort === "increase" ? "decrease" : "increase"
			return sortArray
		},
		[sort]
	)

	const onSortByName = useCallback(() => {
		const sortArray = toggleSortArray(SortFields.name)
		setSort(sortArray)
		setProducts(sortByFields(sortArray, products))
	}, [products])

	const onSortByPrice = useCallback(() => {
		const sortArray = toggleSortArray(SortFields.price)
		setSort(sortArray)
		setProducts(sortByFields(sortArray, products))
	}, [products])

	const onDelete = useCallback((product: Product) => {
		openModal("delete", product)
	}, [])

	const onEdit = useCallback((product: Product) => {
		openModal("edit", product)
	}, [])

	const onView = useCallback((product: Product) => {
		openModal("view", product)
	}, [])
	
	return (
		<TableBase sort={sort} onSortByName={onSortByName} onSortByPrice={onSortByPrice}>
			{products.map((item) => {
				return <TableRow key={item.id} product={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
			})}
		</TableBase>
	)
}

export default React.memo(Table)
