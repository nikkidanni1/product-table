import React, { useState } from 'react'
import ModalBase from 'components/ModalBase'
import TextField from 'components/TextField'
import { formatPrice } from 'utils' 

import './style.scss'

const countriesList = ['USA', 'Russia', 'Japan']
const cities = [
	['Washington', 'New York'],
	['Moscow', 'Saratov', 'Omsk'],
	['Tokio', 'Kioto'],
]
const deliverySelectList = ['None', 'Country', 'City']

const ModalForms = ({ close, modalMode, selectedProduct }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [count, setCount] = useState('0')
	const [price, setPrice] = useState('0')
	// const [delivery, setDelivery] = useState(0)
	// const [selectedCountry, setSelectedCountry] = useState()
	// const [selectedCity, setSelectedCity] = useState([])
	const [errors, setErrors] = useState({
		name: 'Name is required',
		email: 'Email is required',
	})

	const onChangeName = (value) => {
		const length = value.length
		if (length < 16) {
			if (length > 0 && /[^\s]{1,}/g.exec(value) === null) {
				setErrors({ ...errors, name: 'Field Name is invalid' })
			} else if (length === 0) {
				setErrors({ ...errors, name: 'Name is required' })
			} else {
				setErrors({ ...errors, name: '' })
			}
			setName(value)
		}
	}

	const onChangeEmail = (value) => {
		const length = value.length
		if (length > 0 && /\S+@\S+\.\S+/.exec(value) === null) {
			setErrors({ ...errors, email: 'Field Email is invalid' })
		} else if (length === 0) {
			setErrors({ ...errors, email: 'Email is required' })
		} else {
			setErrors({ ...errors, email: '' })
		}

		setEmail(value)
	}

	const onChangeCount = (value) => {
		const res = +value.replace(/[^0-9]/g, '')
		setCount(res.toString())
	}

	const onChangePrice = (value) => {
		const num = +value.replace(/[^0-9\.]/g, '')

		let res = num.toString()
		if (value[value.length - 1] === '.') {
			res += '.'
		}

		if (/[0-9]+(?:(?=\.)\.[0-9]*|)/g.exec(res) !== null) {
			setPrice(res)
		}
	}

	return (
		<ModalBase size='l' close={close}>
			<ul>
				<li>
					<TextField type='text' label='Name' value={name} onChange={onChangeName} error={errors.name} />
				</li>
				<li>
					<TextField type='email' label='Supplier email' value={email} onChange={onChangeEmail} error={errors.email} />
				</li>
				<li>
					<TextField type='number' label='Count' value={count} onChange={onChangeCount} />
				</li>
				<li>
					<TextField type='text' label='Price' value={price} onChange={onChangePrice} formattedFunc={formatPrice} />
				</li>
			</ul>
		</ModalBase>
	)
}

export default ModalForms
