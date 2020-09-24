export const formatPrice = (value) => {
	const [integer, fractional] = value.toString().split('.')
	return `$${integer
		.split('')
		.reverse()
		.join('')
		.replace(/([0-9]{3}(?=[0-9]))/g, '$1,')
		.split('')
		.reverse()
		.join('')}${fractional !== undefined ? `.${fractional}` : ''}`
}
