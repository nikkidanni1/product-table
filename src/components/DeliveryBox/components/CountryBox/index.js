import React from 'react'

const CountryBox = ({ countriesList, onChange, selectedCountry }) => {
    
	return (
		<div className='deliveryBox__box'>
			{countriesList.map((country) => (
				<fieldset key={country}>
					<input
						type='radio'
						id={country}
						name='country'
						value={country}
						onChange={onChange}
						checked={selectedCountry === country}
					/>
					<label htmlFor={country}>{country}</label>
				</fieldset>
			))}
		</div>
	)
}

export default React.memo(CountryBox)
