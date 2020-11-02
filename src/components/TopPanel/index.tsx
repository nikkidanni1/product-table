/* eslint-disable react/prop-types */
import * as React from "react"
import { useCallback, useState } from "react"

import { Product } from "models"

import "./style.scss"

type IProps = {
	search: (text: string) => void,
	openModal: (type: string, product: Product) => void
}

const TopPanel: React.FunctionComponent<IProps> = ({ search, openModal }) => {
	const [text, setText] = useState<string>("")

	const openCreateModal = useCallback(() => {
		openModal("create", null)
	}, [])

	const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
	}, [])

	const onSearch = useCallback(
		() => {
			search(text)
		},
		[text]
	)

	return (
		<header className='topPanel'>
			<input className='topPanel__search' type='text' value={text} onChange={onChangeText} />
			<button onClick={onSearch}>Search</button>
			<button className='topPanel__right' onClick={openCreateModal}>
				Add New
			</button>
		</header>
	)
}

export default React.memo(TopPanel)
