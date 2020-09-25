import React, { useState } from 'react'
import './style.scss'

const TextField = ({ type, label, value, onChange, error, formattedFunc, atteptAccept }) => {
	const [touched, setTouched] = useState(false)
	const [inFocus, setInFocus] = useState(false)

	return (
		<fieldset className='textField'>
			<label className='textField__label' htmlFor={label}>{`${label}:`}</label>
			<input
				id={label}
				className={`textField__input ${(error && (touched || atteptAccept)) ? 'error' : ''}`}
				type={type}
				value={(formattedFunc && !inFocus) ? formattedFunc(value) : value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={(e) => {
					setTouched(true)
					setInFocus(false)
				}}
				onFocus={(e) => {
					setInFocus(true)
				}}
			/>
			{(error && (touched || atteptAccept)) && <span className='textField__error'>{error}</span>}
		</fieldset>
	)
}

export default TextField
