import React, { useState } from 'react'
import './style.scss'

const TopPanel = ({ search, openModal }) => {
	const [text, setText] = useState('')
	return (
		<header className='topPanel'>
			<input
				className='topPanel__search'
				type='text'
				value={text}
				onChange={(e) => {
					setText(e.target.value)
				}}
			/>
			<button
				onClick={() => {
					search(text)
				}}
			>
				Search
			</button>
            <button
                className='topPanel__right'
                onClick={() => {
                    openModal('create')
                }}
			>
				Add New
			</button>
		</header>
	)
}

export default TopPanel
