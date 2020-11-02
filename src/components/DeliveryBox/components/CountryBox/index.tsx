/* eslint-disable react/prop-types */
import React from "react"

type IProps = {
	countriesList: Array<string>,
	selectedCountry: string,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CountryBox: React.FunctionComponent<IProps> = ({ countriesList, onChange, selectedCountry }) => {
    
	return (
		<div className="deliveryBox__box">
			{countriesList.map((country) => (
				<fieldset key={country}>
					<input
						type="radio"
						id={country}
						name="country"
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
