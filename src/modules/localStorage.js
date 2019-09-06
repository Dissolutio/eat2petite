const localStorageStateKey = process.env.REACT_APP_LOCAL_STORAGE_KEY

export const getLocalState = () => {
	try {
		const serializedState = localStorage.getItem(localStorageStateKey)
		if (serializedState === null) {
			return undefined
		}
		const localState = JSON.parse(serializedState)
		return localState
	} catch (error) {
		return undefined
	}
}
export const setLocalState = async appState => {
	console.log('setting local', appState)
	try {
		const serializedState = JSON.stringify(appState)
		if (serializedState) {
			localStorage.setItem(localStorageStateKey, serializedState)
		}
	} catch (error) {
		console.log(error)
	}
}
