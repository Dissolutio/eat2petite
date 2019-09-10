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

	const consoleLogAppData = () => {
		console.log('current appData', appData)
	}

	const loadSampleData = () => {
		const sampleData = {
			...appData,
			sampleUsers,
			posts,
			challenges,
			contests,
		}
		console.log('Loading sample data', sampleData)
		setAppData(sampleData)
	}
	const loadLocalData = () => {
		const localData = getLocalState()
		if (localData) {
			console.log('localData', localData)
			setAppData(localData)
		}
	}
	const setLocalData = () => {
		setLocalState(appData)
	}
	const loadFirebaseData = () => {
		firebaseApp.db
			.ref('/')
			.once('value')
			.then(snapshot => {
				let snapshotValue = snapshot.val()
				if (snapshotValue === null || undefined) {
					return {}
				} else {
					const data = Object.entries(snapshotValue).reduce((result, entry) => {
						const key = entry[0]
						const value = entry[1]
						return {
							...result,
							[key]: { ...value },
						}
					}, {})
					return data
				}
			})
			.then(data => {
				const challenges = Object.values(data.challenges)
				const contests = Object.values(data.contests)
				const posts = Object.values(data.posts)
				const sampleUsers = Object.values(data.sampleUsers)
				const newData = {
					sampleUsers,
					posts,
					challenges,
					contests,
				}
				console.log('firebaseData', newData)
				setAppData({
					...appData,
					...newData,
				})
			})
	}

	return {
		appData,
		consoleLogAppData,
		loadSampleData,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		setSampleDataToFirebase,
	}
}

export { DataContextProvider, useDataContext }
