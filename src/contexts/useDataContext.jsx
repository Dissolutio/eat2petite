import React, { useContext, useState } from 'react'

import { useFirebaseContext } from '../contexts//useFirebaseContext'
import { useAuthUserContext } from '../contexts//useAuthUserContext'
import { getLocalState, setLocalState } from '../modules/localStorage'
import { sampleUsers, samplePosts, sampleChallenges, sampleContests } from '../sampleData'

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
	const setSampleDataToFirebase = async () => {
		const exampleUser = sampleUsers.find(sampleUser => sampleUser.username === 'Jack')
		const examplePassword = 'password'
		const userId = await firebaseApp.doCreateNewUser(exampleUser, examplePassword)
		console.log(`Jill's new ID`, userId)
		// const getDateArray = (start, end) => {
		// 	const arr = new Array()
		// 	const dt = new Date(start)
		// 	while (dt <= end) {
		// 		arr.push({
		// 			date: new Date(dt),
		// 		})
		// 		dt.setDate(dt.getDate() + 1)
		// 	}
		// 	return arr
		// }

		// const sampleStartDate = new Date(2019, 8, 1)
		// const sampleEndDate = new Date(2019, 8, 4)
		// getDateArray(sampleStartDate, sampleEndDate).forEach(post => {
		// 	const newPost = {
		// 		...post,
		// 		author: 'xv870nS3Y0X2dQxCOIly1yv9RDv1', // username: Jack
		// 		// author: '8uuaKHW0ccTMu5seVAKUMmFv3b73', // username: Jill
		// 	}
		// 	firebaseApp.dbCreateUserPost(newPost)
		// })
		sampleChallenges.forEach(challenge => firebaseApp.dbSaveNewChallenge(challenge))
		sampleContests.forEach(contest => firebaseApp.dbSaveNewContest(contest))
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
	const loadFirebaseData = async () => {
		const challenges = await getChallenges()
		const users = await getUsers()
		const contests = await getContests()
		const posts = await getPosts()
		const newData = {
			users,
			challenges,
			contests,
			posts,
		}
		console.log('firebaseData', newData)
		setAppData({
			...appData,
			...newData,
		})
	}
	const getChallenges = () => {
		return firebaseApp.db
			.ref('/challenges')
			.once('value')
			.then(snapshot => snapshot.val())
	}
	const getUsers = () => {
		if (user.userRole === 'admin') {
			return firebaseApp
				.dbPrivateUsers()
				.once('value')
				.then(snapshot => snapshot.val())
		} else {
			return firebaseApp
				.dbPublicUsers()
				.once('value')
				.then(snapshot => snapshot.val())
		}
	}
	const getPosts = () => {
		if (user.userRole === 'default') {
			return firebaseApp
				.dbPostsByUserId(user.uid)
				.once('value')
				.then(snapshot => snapshot.val())
		} else if (user.userRole === 'admin') {
			return firebaseApp
				.dbPosts()
				.once('value')
				.then(snapshot => snapshot.val())
		} else {
			return {}
		}
	}
	const getContests = () => {
		return firebaseApp
			.dbContests()
			.once('value')
			.then(snapshot => snapshot.val())
	}
	const updateChallenge = (updatedChallenge) => firebaseApp.dbUpdateChallenge(updatedChallenge)

	const enrollUserInContest = (userId, contestId) => {
		return firebaseApp.dbEnrollUserInContest(userId, contestId)
	}
	const createContest = contest => {
		return firebaseApp.dbSaveNewContest(contest)
	}
	const createUserPost = post => {
		firebaseApp.dbCreateUserPost(post)
	}

	return {
		appData,
		loadSampleData,
		setSampleDataToFirebase,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		consoleLogAppData,
		enrollUserInContest,
		createUserPost,
		createContest,
		updateChallenge,
	}
}

export { DataContextProvider, useDataContext }
