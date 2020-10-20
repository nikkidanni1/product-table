import React from 'react'

const DeliverySelectBox = ({ delivery, deliverySelectList, selectedCountry, onChange }) => {
	return (
		<div>
			<label>Delivery</label>
			<select className='form__select' value={delivery} onChange={onChange}>
				{deliverySelectList.map((item) => (
					<option key={item} disabled={selectedCountry === '' && item === 'City'}>
						{item}
					</option>
				))}
			</select>
		</div>
	)
}

export default React.memo(DeliverySelectBox)
