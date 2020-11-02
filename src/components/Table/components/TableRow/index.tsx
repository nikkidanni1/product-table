/* eslint-disable react/prop-types */
import React, { useCallback } from "react"
import { Product } from "models"
import TableRowView from "../TableRowView"

type IProps = {
	product: Product,
	onView: (product: Product) => void,
	onEdit: (product: Product) => void,
	onDelete: (product: Product) => void
}

const TableRow: React.FunctionComponent<IProps> = ({ product, onView, onEdit, onDelete }) => {
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
		<TableRowView
			onView={onViewProduct}
			name={product.name}
			count={product.count}
			price={product.price}
			onEdit={onEditProduct}
			onDelete={onDeleteProduct}
		/>
	)
}

export default React.memo(TableRow)
