import React, { useState } from 'react'
import ModalBase from 'components/ModalBase'
import TextField from 'components/TextField'

import './style.scss'

const countriesList = ['USA', 'Russia', 'Japan']
const cities = [['Washington', 'New York'], ['Moscow', 'Saratov', 'Omsk'], ['Tokio', 'Kioto']]
const deliverySelectList = ['None', 'Country', 'City']

const ModalForms = ({ close, modalMode, selectedProduct }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [selectedCountry, setSelectedCountry] = useState()
    const [selectedCity, setSelectedCity] = useState([])
    // console.log(/[^\s]{1,}/g.exec('123 '), 'name')
    return (
        <ModalBase size='l' close={close}>
            <ul>
                <li>
                    <TextField type='text' label='Name' />
                </li>
            </ul>
        </ModalBase>
    )
}

export default ModalForms