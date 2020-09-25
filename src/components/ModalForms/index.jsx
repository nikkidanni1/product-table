import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addProduct } from 'store/configureStore'

import ModalBase from 'components/ModalBase'
import TextField from 'components/TextField'
import DeliveryBox from 'components/DeliveryBox'
import { formatPrice } from 'utils'

import './style.scss'

const countriesList = ['USA', 'Russia', 'Japan']
const citiesList = [
	['Washington', 'New York'],
	['Moscow', 'Saratov', 'Omsk'],
	['Tokio', 'Kioto'],
]

const ModalForms = ({ close, modalMode, selectedProduct, addProduct }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [count, setCount] = useState('0')
	const [price, setPrice] = useState('0')
	const [delivery, setDelivery] = useState({
		country: '',
		city: '',
	})
	const [errors, setErrors] = useState({
		name: 'Name is required',
		email: 'Email is required',
		city: '',
	})
	const [atteptAccept, setAtteptAccept] = useState(false)

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
		const num = +value.replace(/[^0-9.]/g, '')

		let res = num.toString()
		if (value[value.length - 1] === '.') {
			res += '.'
		}

		if (/[0-9]+(?:(?=\.)\.[0-9]*|)/g.exec(res) !== null) {
			setPrice(res)
		}
	}

	const onChangedDelivery = (obj) => {
		setDelivery({
			country: obj.country,
			city: obj.city,
		})
		setErrors({ ...errors, city: obj.error })
	}

	const onAccept = () => {
		let hasError = false
		for (const key in errors) {
			if (errors[key] !== '') {
				hasError = true
				break
			}
		}

		if (!hasError) {
			const data = {
				name,
				email,
				count,
				price,
				country: delivery.country !== null ? countriesList[delivery.country] : '',
				city: [],
			}
			data.city = citiesList[delivery.country].filter((item, index) => delivery.city.has(index))
			addProduct(data)
			close()
		}
	}

	return (
		<ModalBase size='l' close={close}>
			<ul className='form'>
				<li className='form__item'>
					<TextField
						type='text'
						label='Name'
						value={name}
						onChange={onChangeName}
						error={errors.name}
						atteptAccept={atteptAccept}
					/>
				</li>
				<li className='form__item'>
					<TextField
						type='email'
						label='Supplier email'
						value={email}
						onChange={onChangeEmail}
						error={errors.email}
						atteptAccept={atteptAccept}
					/>
				</li>
				<li className='form__item'>
					<TextField type='number' label='Count' value={count} onChange={onChangeCount} />
				</li>
				<li className='form__item'>
					<TextField type='text' label='Price' value={price} onChange={onChangePrice} formattedFunc={formatPrice} />
				</li>
				<li className='form__item'>
					<DeliveryBox
						onChange={onChangedDelivery}
						countriesList={countriesList}
						citiesList={citiesList}
						atteptAccept={atteptAccept}
					/>
				</li>
				<li>
					<button
						onClick={() => {
							setAtteptAccept(true)
							onAccept()
						}}
					>
						Add
					</button>
				</li>
			</ul>
		</ModalBase>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		addProduct: (payload) => dispatch(addProduct(payload)),
	}
}

export default connect(null, mapDispatchToProps)(ModalForms)
