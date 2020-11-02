/* eslint-disable react/prop-types */
import React from "react"

type IProps = {
	delivery: string,
	deliverySelectList: Array<string>,
	selectedCountry: string,
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const DeliverySelectBox: React.FunctionComponent<IProps> = ({ delivery, deliverySelectList, selectedCountry, onChange }) => {
	return (
		<div>
			<label>Delivery</label>
			<select className="form__select" value={delivery} onChange={onChange}>
				{deliverySelectList.map((item) => (
					<option key={item} disabled={selectedCountry === "" && item === "City"}>
						{item}
					</option>
				))}
			</select>
		</div>
	)
}

export default React.memo(DeliverySelectBox)
