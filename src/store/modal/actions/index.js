export const TYPES = {
	CHANGE_MODE: 'CHANGE_MODE',
}

export const changeMode = (type) => {
    return { type: TYPES.CHANGE_MODE, payload: type }
}