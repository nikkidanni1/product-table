/* eslint-disable react/prop-types */
import React from "react"

import { Sort } from "models"

import "./style.scss"

type IProps = {
	children: any,
	sort: Array<Sort>,
	onSortByName: () => void,
	onSortByPrice: () => void
}

const TableBase: React.FunctionComponent<IProps> = ({ children, sort, onSortByName, onSortByPrice }) => {
	
	return (
		<table className='table'>
			<thead>
				<tr>
					<th className='tableHeader__cell'>
						Name
						<img
							className={`tableHeader__cellSort ${
								sort.filter((item) => item.name === "name")[0].sort === "increase"
									? ""
									: "tableHeader__cellSort_decrease"
							}`}
							src='/images/sort.svg'
							alt='sort'
							onClick={onSortByName}
						/>
					</th>
					<th className={"tableHeader__cell"}>
						Price
						<img
							className={`tableHeader__cellSort ${
								sort.filter((item) => item.name === "price")[0].sort === "increase"
									? ""
									: "tableHeader__cellSort_decrease"
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

export default React.memo(TableBase)
