import React, { useContext, useState } from 'react'
import { useFirebaseContext, useAuthUserContext } from '../../firebase'
import { getLocalState, setLocalState } from '../localStorage'
import { sampleUsers, samplePosts, sampleChallenges, sampleContests } from '../../sampleData'
const DataContext = React.createContext([{}, () => {}])

const DataContextProvider = props => {
	const [appData, setAppData] = useState(() => {
		return {
			users: [],
			posts: [],
			challenges: [],
			contests: [],
		}
	})
	return <DataContext.Provider value={[appData, setAppData]}>{props.children}</DataContext.Provider>
}

const useDataContext = () => {
	const firebaseApp = useFirebaseContext()
	const { user } = useAuthUserContext()
	const [appData, setAppData] = useContext(DataContext)

	// LOAD SAMPLE DATA
	const loadSampleData = () => {
		const sampleData = {
			...appData,
			sampleUsers,
			samplePosts,
			sampleChallenges,
			sampleContests,
		}
		console.log('Loading sample data', sampleData)
		setAppData(sampleData)
	}
	// UPLOAD SAMPLE DATA TO FIREBASE

	const setSampleDataToFirebase = () => {
		const user1 = sampleUsers.find(sampleUser => sampleUser.sampleId === 'user_1')
		sampleChallenges.forEach(challenge => firebaseApp.dbSaveNewChallenge(challenge))
		// sampleUsers.forEach(sampleUser => firebaseApp.doCreateNewUser(sampleUser))
		firebaseApp.doCreateNewUser(user1)
		// createFirebaseUser(user1)
	}
	// LOG CURRENT DATA
	const consoleLogAppData = () => {
		console.log('current appData', appData)
	}

	// LOAD LOCAL DATA
	const loadLocalData = () => {
		const localData = getLocalState()
		if (localData) {
			console.log('localData', localData)
			setAppData(localData)
		}
	}
	// SAVE DATA TO LOCAL
	const setLocalData = () => {
		setLocalState(appData)
	}

	// LOAD FIREBASE DATA
	const getChallenges = () => {
		if (user.userRole === 'default') {
		}
		return firebaseApp.db
			.ref('/challenges')
			.once('value')
			.then(snapshot => snapshot.val())
	}
	const getUsers = () => {
		console.log(user.userRole)
		if (user.userRole === 'default') {
			return firebaseApp.db
				.ref(`/users/${user.uid}`)
				.once('value')
				.then(snapshot => snapshot.val())
		} else {
			return {}
		}
	}

	const loadFirebaseData = async () => {
		const challenges = await getChallenges()
		const users = await getUsers()
		// const contests = Object.values(data.contests)
		// const posts = () => {
		// 	const userKeyRing = Object.keys(data.posts)
		// 	userKeyRing.filter(key => user && user.uid === key)
		// 	return {}
		// }
		// const users = Object.values(data.users)
		const newData = {
			users,
			// posts: posts(),
			challenges,
			// contests,
		}
		console.log('firebaseData', newData)
		setAppData({
			...appData,
			...newData,
		})
	}
	return {
		// INITIALIZE
		appData,
		loadSampleData,
		setSampleDataToFirebase,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
		// METHODS
	}
}

export { DataContextProvider, useDataContext }
