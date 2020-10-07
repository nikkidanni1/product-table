import React, { useState, useCallback } from 'react'

import './style.scss'

const deliverySelectList = ['-', 'Country', 'City']

const DeliveryBox = ({ onChange, countriesList, citiesList, atteptAccept, defaultValues }) => {
	const [delivery, setDelivery] = useState(defaultValues.city.size === 0 ? deliverySelectList[0] : deliverySelectList[1])
	const [selectedCountry, setSelectedCountry] = useState(defaultValues.country)
	const [selectedCity, setSelectedCity] = useState(defaultValues.city)
	const [error, setError] = useState('')
	const [isTouchedCities, setTouchedCities] = useState(false)

	const onChangeDelivery = useCallback((e) => {
		const value = e.target.value
		let newCountry = selectedCountry
		let newCity = selectedCity
		let newError = error

		if (value === deliverySelectList[0]) {
			newCountry = null
			newCity = new Set()
		}

		if (
			value === deliverySelectList[0] ||
			selectedCountry === null ||
			(selectedCountry !== null && selectedCity.size !== 0)
		) {
			newError = ''
		} else {
			newError = 'Check city'
		}

		setDelivery(value)
		setSelectedCountry(newCountry)
		setSelectedCity(newCity)
		setError(newError)

		onChange({ country: newCountry, city: newCity, error: newError })
	}, [selectedCountry, selectedCity, error, onChange])

	const onChangeCountry = useCallback((index) => {
		let newCountry = index
		let newCity = new Set()
		let newError = 'Check city'

		setSelectedCountry(newCountry)
		setSelectedCity(newCity)
		setError(newError)

		onChange({ country: newCountry, city: newCity, error: newError })
	}, [onChange])

	const onChangeAllCities = useCallback((e) => {
		const target = e.target
		let newCity = selectedCity
		let newError = error

		if (target.checked) {
			newCity = new Set([...citiesList.map((item, index) => index), +target.value])
			newError = ''
		} else {
			newCity = new Set()
			newError = 'Check city'
		}

		setSelectedCity(newCity)
		setError(newError)
		setTouchedCities(true)

		const cityOut = new Set([...newCity])
		cityOut.delete(+target.value)

		onChange({ country: selectedCountry, city: cityOut, error: newError })
	}, [selectedCity, error, onChange])

	const onChangeCities = useCallback((e, index) => {
		const checked = e.target.checked
		const newCity = new Set([...selectedCity])
		let newError = error

		newCity.delete(citiesList[selectedCountry].length)
		if (checked) {
			newCity.add(index)
		} else {
			newCity.delete(index)
		}

		if (newCity.size === 0) {
			newError = 'Check city'
		} else {
			newError = ''
		}

		setSelectedCity(newCity)
		setError(newError)
		setTouchedCities(true)

		onChange({ country: selectedCountry, city: newCity, error: newError })
	}, [onChange, selectedCity, error])
	
	return (
		<div className='deliveryBox'>
			<div>
				<label>Delivery</label>
				<select className='form__select' value={delivery} onChange={onChangeDelivery}>
					{deliverySelectList.map((item) => (
						<option key={item} disabled={selectedCountry === null && item === 'City'}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div>
				{delivery === deliverySelectList[1] && (
					<div className='deliveryBox__box'>
						{countriesList.map((country, index) => (
							<fieldset key={country}>
								<input
									type='radio'
									id={country}
									name='country'
									value={index + 1}
									onChange={(e) => onChangeCountry(index)}
									checked={selectedCountry === index}
								/>
								<label htmlFor={country}>{country}</label>
							</fieldset>
						))}
					</div>
				)}
				<div>
					{delivery === deliverySelectList[2] && (
						<div className='deliveryBox__box'>
							<fieldset className='deliveryBox__fieldsetAccent'>
								<input
									type='checkbox'
									id='allCities'
									value={citiesList[selectedCountry].length}
									onChange={onChangeAllCities}
									checked={selectedCity.has(citiesList[selectedCountry].length)}
								/>
								<label htmlFor='allCities'>Select All</label>
							</fieldset>
							{citiesList[selectedCountry].map((city, index) => (
								<fieldset key={city}>
									<input
										type='checkbox'
										id={city}
										name='subscribe'
										value={index}
										onChange={(e) => {
											onChangeCities(e, index)
										}}
										checked={selectedCity.has(index)}
									/>
									<label htmlFor={city}>{city}</label>
								</fieldset>
							))}
						</div>
					)}
					{error && (isTouchedCities || atteptAccept) && <span className='form__selectError'>{error}</span>}
				</div>
			</div>
		</div>
	)
}

export default DeliveryBox