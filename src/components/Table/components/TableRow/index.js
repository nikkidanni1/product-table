import React, { useCallback } from 'react'
import TableRowView from '../TableRowView'

const TableRow = ({ product, onView, onEdit, onDelete }) => {
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
