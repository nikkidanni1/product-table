import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { addProduct, editProduct } from 'store/products/actions'

import { validation } from './utils'

import TextField from 'components/TextField'
import DeliveryBox from 'components/DeliveryBox'
import { formatPrice } from 'utils'

import './style.scss'

const countriesList = ['USA', 'Russia', 'Japan']
const citiesList = {
	USA: ['Washington', 'New York'],
	Russia: ['Moscow', 'Saratov', 'Omsk'],
	Japan: ['Tokio', 'Kioto'],
}

const schemes = {
	name: { minLength: 1, maxLength: 15, pattern: '[^\\s]{1,}' },
	email: { minLength: 1, pattern: '\\S+@\\S+\\.\\S+' },
	count: { type: 'integer', minimum: 0 },
	price: { type: 'number', minimum: 0 },
}

const ModalForms = ({ product, dispatch, close }) => {
	const initDelivery = useCallback(() => {
		let res = { country: '', city: new Set() }
		if (product !== null && product.city.length !== 0) {
			const country = product.country
			let city = []
			citiesList[country].forEach((item, index) => {
				if (product.city.includes(item)) {
					city.push(index)
				}
			})
			res = { country, city: new Set(city) }
		}
		return res
	}, [])

	const type = useSelector((state) => state.modal.mode)

	const [name, setName] = useState(product ? product.name : '')
	const [email, setEmail] = useState(product ? product.email : '')
	const [count, setCount] = useState(product ? product.count : '0')
	const [price, setPrice] = useState(product ? product.price : '0')
	const [delivery, setDelivery] = useState(initDelivery)
	const [errors, setErrors] = useState({
		name: product ? '' : 'Name is required',
		email: product ? '' : 'Email is required',
		count: '',
		price: '',
		city: '',
	})
	const [atteptAccept, setAtteptAccept] = useState(false)

	const onChangeTextfield = useCallback(
		(e, field, setState) => {
			const value = e.target.value
			const error = validation(schemes[field], value)
			setErrors({ ...errors, [field]: error === 'No errors' ? '' : error })
			setState(value)
		},
		[errors]
	)

	const onChangeName = useCallback(
		(e) => {
			onChangeTextfield(e, 'name', setName)
		},
		[errors]
	)

	const onChangeEmail = useCallback(
		(e) => {
			onChangeTextfield(e, 'email', setEmail)
		},
		[errors]
	)

	const onChangeCount = useCallback(
		(e) => {
			onChangeTextfield(e, 'count', setCount)
		},
		[errors]
	)

	const onChangePrice = useCallback(
		(e) => {
			onChangeTextfield(e, 'price', setPrice)
		},
		[errors]
	)

	const onChangedDelivery = useCallback(
		(obj) => {
			setDelivery({
				country: obj.country,
				city: obj.city,
			})
			setErrors({ ...errors, city: obj.error })
		},
		[errors]
	)

	const onAccept = useCallback(() => {
		setAtteptAccept(true)

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
				country: delivery.country,
				city: [],
			}
			data.city =
				delivery.country !== '' ? citiesList[delivery.country].filter((item, index) => delivery.city.has(index)) : []
			if (type === 'edit') {
				dispatch(editProduct({ ...data, id: product.id }))
			} else {
				dispatch(addProduct(data))
			}
			close()
		}
	}, [errors, name, email, count, price, delivery, type])

	return (
		<>
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
					<TextField
						type='number'
						label='Count'
						value={count}
						onChange={onChangeCount}
						error={errors.count}
						atteptAccept={atteptAccept}
					/>
				</li>
				<li className='form__item'>
					<TextField
						type='text'
						label='Price'
						value={price}
						onChange={onChangePrice}
						error={errors.price}
						atteptAccept={atteptAccept}
						formattedFunc={formatPrice}
					/>
				</li>
				<li className='form__item'>
					<DeliveryBox
						defaultValues={delivery}
						onChange={onChangedDelivery}
						countriesList={countriesList}
						citiesList={citiesList}
						atteptAccept={atteptAccept}
					/>
				</li>
				<li>
					<button onClick={onAccept}>{product !== null ? 'Update' : 'Add'}</button>
				</li>
			</ul>
		</>
	)
}

export default React.memo(ModalForms)
