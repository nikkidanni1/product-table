import React, { useCallback, useState } from 'react'
import './style.scss'

const TopPanel = ({ search, openModal }) => {
	const [text, setText] = useState('')

	const openCreateModal = useCallback(() => {
		openModal('create', null)
	}, [])

	const onChangeText = useCallback((e) => {
		setText(e.target.value)
	}, [])

	const onSearch = useCallback((e) => {
		search(text)
	}, [text])

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
