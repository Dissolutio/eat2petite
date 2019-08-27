import React, { useContext, useState } from 'react'
import { useFirebaseContext } from '../../firebase'
import { getLocalState, setLocalState } from '../localStorage'

const DataContext = React.createContext([{}, () => {}])

const DataContextProvider = props => {
	const [appData, setAppData] = useState(() => {
		return {
			cardsInGallery: [],
			coreCards: [],
		}
	})
	return <DataContext.Provider value={[appData, setAppData]}>{props.children}</DataContext.Provider>
}

const useDataContext = () => {
	const firebaseApp = useFirebaseContext()
	const [appData, setAppData] = useContext(DataContext)
	React.useEffect(() => {
		loadAppState()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadAppState = async () => {
		const localData = await getLocalState()
		if (localData) {
			setAppData(localData)
			return
		} else {
			const firebaseData = await firebaseApp.dbAllUsers.once('value')
			if (firebaseData) {
				setAppData(firebaseData)
			} else {
				return
			}
		}
	}
	return {
		appData,
		loadAppState,
	}
}

export { DataContextProvider, useDataContext }
