/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react"
import "./style.scss"

type IProps = {
	type: string,
	label: string,
	value: string | number,
	onChange: (e: any) => void,
	error: string,
	formattedFunc?: (value: string | number) => string,
	atteptAccept: boolean
}

const TextField: React.FunctionComponent<IProps> = ({ type, label, value, onChange, error, formattedFunc, atteptAccept }) => {
	const [touched, setTouched] = useState(false)
	const [inFocus, setInFocus] = useState(false)

	const onBlur = useCallback(() => {
		setTouched(true)
		setInFocus(false)
	}, [])

	const onFocus = useCallback(() => {
		setInFocus(true)
	}, [])
	
	return (
		<fieldset className='textField'>
			<label className='textField__label' htmlFor={label}>{`${label}:`}</label>
			<input
				id={label}
				className={`textField__input ${error && (touched || atteptAccept) ? "error" : ""}`}
				type={type}
				value={(formattedFunc && !inFocus && !error) ? formattedFunc(value) : value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
			{error && (touched || atteptAccept) && <span className='textField__error'>{error}</span>}
		</fieldset>
	)
}

export default React.memo(TextField)