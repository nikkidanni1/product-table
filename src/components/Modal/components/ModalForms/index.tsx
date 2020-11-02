/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { Dispatch } from "redux"

import { Product, CombinedState } from "models"
import { addProduct, editProduct } from "store/products/actions"

import { validation } from "./utils"

import TextField from "components/TextField"
import DeliveryBox from "components/DeliveryBox"
import { formatPrice } from "utils"

import "./style.scss"

const countriesList: Array<string> = ["USA", "Russia", "Japan"]
const citiesList: { [prop: string]: Array<string> } = {
	USA: ["Washington", "New York"],
	Russia: ["Moscow", "Saratov", "Omsk"],
	Japan: ["Tokio", "Kioto"],
}

type IProps = {
	product: Product,
	dispatch: Dispatch<any>,
	close: () => void
}

enum ErrorFields {
	name = "name",
	email = "email",
	count = "count",
	price = "price",
	city = "city"
}

type IErrorFields = {
	[ErrorFields.name]: string,
	[ErrorFields.email]: string,
	[ErrorFields.count]: string,
	[ErrorFields.price]: string,
	[ErrorFields.city]: string
}

const schemes: {
	[prop: string]: {
		minLength?: number,
		maxLength?: number,
		pattern?: string,
		type?: string,
		minimum?: number,
		maximum?: number
	}
} = {
	name: { minLength: 1, maxLength: 15, pattern: "[^\\s]{1,}" },
	email: { minLength: 1, pattern: "\\S+@\\S+\\.\\S+" },
	count: { type: "integer", minimum: 0 },
	price: { type: "number", minimum: 0 },
}

const ModalForms: React.FunctionComponent<IProps> = ({ product, dispatch, close }) => {
	const initDelivery = useCallback(() => {
		let res = { country: "", city: new Set() }
		if (product !== null && product.city.length !== 0) {
			const country: string = product.country
			let city: Array<number> = []
			citiesList[country].forEach((item: string, index: number) => {
				if (product.city.includes(item)) {
					city.push(index)
				}
			})
			res = { country, city: new Set(city) }
		}
		return res
	}, [])

	const type = useSelector((state: CombinedState) => state.modal.mode)

	const [name, setName] = useState<string>(product ? product.name : "")
	const [email, setEmail] = useState<string>(product ? product.email : "")
	const [count, setCount] = useState<number>(product ? product.count : 0)
	const [price, setPrice] = useState<number>(product ? product.price : 0)
	const [delivery, setDelivery] = useState<{ country: string, city: any }>(initDelivery)
	const [errors, setErrors] = useState<IErrorFields>({
		name: product ? "" : "Name is required",
		email: product ? "" : "Email is required",
		count: "",
		price: "",
		city: "",
	})
	const [atteptAccept, setAtteptAccept] = useState<boolean>(false)

	const onChangeTextfield = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, field, setState) => {
			const value: string | number = e.target.value
			const error = validation(schemes[field], value)
			setErrors({ ...errors, [field]: error === "No errors" ? "" : error })
			setState(value)
		},
		[errors]
	)

	const onChangeName = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChangeTextfield(e, "name", setName)
		},
		[errors]
	)

	const onChangeEmail = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChangeTextfield(e, "email", setEmail)
		},
		[errors]
	)

	const onChangeCount = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChangeTextfield(e, "count", setCount)
		},
		[errors]
	)

	const onChangePrice = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChangeTextfield(e, "price", setPrice)
		},
		[errors]
	)

	const onChangedDelivery = useCallback(
		(obj: { country: string, city: any, error: string }) => {
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

		let hasError: boolean = false

		for (const key in ErrorFields) {
			const field = ErrorFields[key as keyof typeof ErrorFields]
			if (errors[field] !== "") {
				hasError = true
				break
			}
		}

		if (!hasError) {
			const data: {
				name: string,
				email: string,
				count: number,
				price: number,
				country: string,
				city: Array<string>
			} = {
				name,
				email,
				count,
				price,
				country: delivery.country,
				city: [],
			}
			data.city =
				delivery.country !== "" ? citiesList[delivery.country].filter((item, index) => delivery.city.has(index)) : []
			if (type === "edit") {
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
					<button onClick={onAccept}>{product !== null ? "Update" : "Add"}</button>
				</li>
			</ul>
		</>
	)
}

export default React.memo(ModalForms)
