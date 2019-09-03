import React, { useContext, useState } from 'react'
import { useFirebaseContext } from '../../firebase'
import { getLocalState, setLocalState } from '../localStorage'
import { sampleUsers, posts, challenges, contests } from '../../sampleData'

const DataContext = React.createContext([{}, () => {}])

const DataContextProvider = props => {
	const [appData, setAppData] = useState(() => {
		return {
			sampleUsers: [],
			posts: [],
			challenges: [],
			contests: [],
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
	const setSampleDataToFirebase = () => {
		function sendOff(array, firebaseRef) {
			array.forEach(item =>
				firebaseApp.db
					.ref(`${firebaseRef}`)
					.child(`${item.uid}`)
					.set(item),
			)
		}
		sendOff(appData.sampleUsers, 'sampleUsers')
		sendOff(appData.posts, 'posts')
		sendOff(appData.challenges, 'challenges')
		sendOff(appData.contests, 'contests')
	}

	const loadSampleData = () => {
		setAppData({
			sampleUsers,
			posts,
			challenges,
			contests,
		})
	}
	return {
		appData,
		loadAppState,
		loadSampleData,
		setSampleDataToFirebase,
	}
}

export { DataContextProvider, useDataContext }
