import React from 'react'
import { connect } from 'react-redux'

import Table from 'components/Table'

import 'App.scss'

function App({ products }) {
	
	return <div className='app'>
		<Table productsProp={products} />
	</div>
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps, null)(App)
