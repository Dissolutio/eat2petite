import React, { useContext, useState } from 'react'

import { useFirebaseContext } from '../contexts//useFirebaseContext'
import { useAuthUserContext } from '../contexts//useAuthUserContext'
import { getLocalState, setLocalState } from '../modules/localStorage'
import { sampleUsers, samplePosts, sampleChallenges, sampleContests } from '../sampleData'
import savePoint from '../assets/savePoint'
const DataContext = React.createContext([{}, () => { }])

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
			users: sampleUsers,
			posts: samplePosts,
			challenges: sampleChallenges,
			contests: sampleContests,
		}
		console.log('Loading sample data', sampleData)
		setAppData(sampleData)
	}
	const dbClear = () => {
		firebaseApp.dbBlowItAllAway()
		console.log("Blowing away all DB Data....")
	}
	const dbLoadSavePoint = () => {
		console.log("Setting DB to SavePoint JSON file")
		firebaseApp.db.ref().set(savePoint)
	}
	const consoleLogAppData = () => {
		console.log('current appData', appData)
	}

	const loadLocalData = () => {
		const localData = getLocalState()
		if (localData) {
			console.log('localData', localData)
			setAppData(localData)
		} else {
			console.log('No local data found')
		}
	}

	const setLocalData = () => {
		setLocalState(appData)
	}


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
		firebaseApp.dbEnrollUserInContest(userId, contestId)
	}

	const createContest = contest => firebaseApp.dbSaveNewContest(contest)

	const createUserPost = post => {
		firebaseApp.dbCreateUserPost(post)
	}

	const updateUserChallengeTarget = (userId, challengeId, target) => firebaseApp.dbSetUserChallengeTarget(userId, challengeId, target)

	return {
		appData,
		consoleLogAppData,
		loadSampleData,
		dbClear,
		dbLoadSavePoint,
		loadLocalData,
		setLocalData,
		loadFirebaseData,
		createUserPost,
		createContest,
		updateChallenge,
		enrollUserInContest,
		updateUserChallengeTarget,
	}
}

export { DataContextProvider, useDataContext }
