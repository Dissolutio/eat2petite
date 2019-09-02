import React, { useContext, useState } from 'react'
import { useFirebaseContext } from '../../firebase'
import { getLocalState, setLocalState } from '../localStorage'
import { users, posts, challenges, contests } from '../../sampleData'

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
		console.log('Loading sample data')
		loadSampleData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadAppState = async () => {
		const localData = await getLocalState()
		console.log('HERE!')
		if (localData) {
			setAppData(localData)
			return
		} else {
			const firebaseData = await firebaseApp.db.once('value')
			if (firebaseData) {
				setAppData(firebaseData)
			} else {
				return
			}
		}
	}
	const loadSampleData = () => {
		setAppData({
			users,
			posts,
			challenges,
			contests,
		})
	}
	return {
		appData,
		loadAppState,
		loadSampleData,
	}
}

export { DataContextProvider, useDataContext }
