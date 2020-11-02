/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react"
import DeliverySelectBox from "./components/DeliverySelectBox"
import CountryBox from "./components/CountryBox"
import CityBox from "./components/CityBox"

import "./style.scss"

const deliverySelectList = ["-", "Country", "City"]

type IProps = {
	onChange: (obj: { country: string, city: any, error: string }) => void,
	countriesList: Array<string>,
	citiesList: { [prop: string]: Array<string> },
	atteptAccept: boolean,
	defaultValues: { country: string, city: any }
}

const DeliveryBox: React.FunctionComponent<IProps> = ({ onChange, countriesList, citiesList, atteptAccept, defaultValues }) => {
	const [delivery, setDelivery] = useState<string>(
		defaultValues.city.size === 0 ? deliverySelectList[0] : deliverySelectList[1]
	)
	const [selectedCountry, setSelectedCountry] = useState<string>(defaultValues.country)
	const [selectedCity, setSelectedCity] = useState<any>(defaultValues.city)
	const [error, setError] = useState<string>("")
	const [isTouchedCities, setTouchedCities] = useState<boolean>(false)

	const onChangeDelivery = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = e.target.value
			let newCountry = selectedCountry
			let newCity = selectedCity
			let newError = error

			if (value === deliverySelectList[0]) {
				newCountry = ""
				newCity = new Set()
			}

			if (
				value === deliverySelectList[0] ||
				selectedCountry === "" ||
				(selectedCountry !== "" && selectedCity.size !== 0)
			) {
				newError = ""
			} else {
				newError = "Check city"
			}

			setDelivery(value)
			setSelectedCountry(newCountry)
			setSelectedCity(newCity)
			setError(newError)

			onChange({ country: newCountry, city: newCity, error: newError })
		},
		[selectedCountry, selectedCity, error, onChange]
	)

	const onChangeCountry = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let newCountry = e.target.value
			let newCity = new Set()
			let newError: string = "Check city"

			setSelectedCountry(newCountry)
			setSelectedCity(newCity)
			setError(newError)

			onChange({ country: newCountry, city: newCity, error: newError })
		},
		[onChange]
	)

	const onChangeAllCities = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const target: HTMLInputElement = e.target
			let newCity = selectedCity
			let newError: string = error

			if (target.checked) {
				newCity = new Set([...citiesList[selectedCountry].map((item, index) => index), +target.value])
				newError = ""
			} else {
				newCity = new Set()
				newError = "Check city"
			}

			setSelectedCity(newCity)
			setError(newError)
			setTouchedCities(true)

			const cityOut = new Set([...newCity])
			cityOut.delete(+target.value)

			onChange({ country: selectedCountry, city: cityOut, error: newError })
		},
		[selectedCity, error, onChange]
	)

	const onChangeCities = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const checked: boolean = e.target.checked
			const index: number = +e.target.value
			const newCity = new Set([...selectedCity])
			let newError: string = error

			newCity.delete(citiesList[selectedCountry].length)
			if (checked) {
				newCity.add(index)
			} else {
				newCity.delete(index)
			}

			if (newCity.size === 0) {
				newError = "Check city"
			} else {
				newError = ""
			}

			setSelectedCity(newCity)
			setError(newError)
			setTouchedCities(true)

			onChange({ country: selectedCountry, city: newCity, error: newError })
		},
		[onChange, selectedCity, error]
	)

	return (
		<div className='deliveryBox'>
			<DeliverySelectBox
				delivery={delivery}
				selectedCountry={selectedCountry}
				deliverySelectList={deliverySelectList}
				onChange={onChangeDelivery}
			/>
			<div>
				{delivery === deliverySelectList[1] && (
					<CountryBox countriesList={countriesList} onChange={onChangeCountry} selectedCountry={selectedCountry} />
				)}

				{delivery === deliverySelectList[2] && (
					<CityBox
						citiesList={citiesList}
						selectedCountry={selectedCountry}
						onChangeAllCities={onChangeAllCities}
						selectedCity={selectedCity}
						onChange={onChangeCities}
					/>
				)}
				{error && (isTouchedCities || atteptAccept) && <span className='form__selectError'>{error}</span>}
			</div>
		</div>
	)
}

export default DeliveryBox