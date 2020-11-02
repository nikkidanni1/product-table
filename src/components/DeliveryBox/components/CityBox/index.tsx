/* eslint-disable react/prop-types */
import React from "react"

type IProps = {
	citiesList: { [prop: string]: Array<string> },
	selectedCountry: string,
	onChangeAllCities: (e: React.ChangeEvent<HTMLInputElement>) => void,
	selectedCity: any,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CityBox: React.FunctionComponent<IProps> = ({ citiesList, selectedCountry, onChangeAllCities, selectedCity, onChange }) => {
	return (
		<div className="deliveryBox__box">
			<fieldset className="deliveryBox__fieldsetAccent">
				<input
					type="checkbox"
					id="allCities"
					value={citiesList[selectedCountry].length}
					onChange={onChangeAllCities}
					checked={selectedCity.has(citiesList[selectedCountry].length)}
				/>
				<label htmlFor="allCities">Select All</label>
			</fieldset>
			{citiesList[selectedCountry].map((city, index) => (
				<fieldset key={city}>
					<input
						type="checkbox"
						id={city}
						name="subscribe"
						value={index}
						onChange={onChange}
						checked={selectedCity.has(index)}
					/>
					<label htmlFor={city}>{city}</label>
				</fieldset>
			))}
		</div>
	)
}

export default React.memo(CityBox)
