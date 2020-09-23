import React from 'react'

const TextField = ({ type, label }) => {
	return (
		<fieldset>
			<label>{label}</label>
			<input type={type} />
		</fieldset>
	)
}

export default TextField
