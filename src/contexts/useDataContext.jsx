import React, { useContext, useState } from 'react'

import { useFirebaseContext } from '../contexts//useFirebaseContext'
import { useAuthUserContext } from '../contexts//useAuthUserContext'
import { getLocalState, setLocalState } from '../modules/localStorage'
import {
  sampleChallenges,
  sampleContests,
} from '../sampleData'
import devDBSavePoint from '../assets/devDBSavePoint'
import { adaptContestData } from '../modules/adapters'

const DataContext = React.createContext([{}, () => { }])

const DataContextProvider = (props) => {
  const [appData, setAppData] = useState(() => {
    return {
      users: {},
      posts: {},
      challenges: {},
      contests: {},
      me: {},
    }
  })
  return (
    <DataContext.Provider value={[appData, setAppData]}>
      {props.children}
    </DataContext.Provider>
  )
}

const useDataContext = () => {
  const firebaseApp = useFirebaseContext()
  const { user } = useAuthUserContext()
  const [appData, setAppData] = useContext(DataContext)

  const dbResetToSample = async () => {
    await firebaseApp.dbBlowItAllAway()
    Object.values(sampleChallenges).forEach((challenge) =>
      firebaseApp.dbSetChallenge(challenge),
    )
    Object.values(sampleContests).forEach((contest) =>
      firebaseApp.dbSaveNewContest(contest),
    )
    const newData = await loadFirebaseData()
    Object.values(newData.users).forEach((user) => {
      if (user.userRole === 'admin') {
        return
      }
      if (user.userRole === 'default') {
        Object.values(newData.contests).forEach((contest) => {
          firebaseApp.dbEnrollUserInContest(user.uid, contest.uid)
        })
      }
    })
    const newestData = await loadFirebaseData()
    console.log('TCL: dbResetToSample -> newestData', newestData)
    return newestData
  }
  const dbLoadSavePoint = () => {
    console.log('Setting DB to SavePoint JSON file')
    firebaseApp.db.ref().set(devDBSavePoint)
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
    const me = await getPersonalProfile()
    const newData = {
      users,
      challenges,
      contests,
      posts,
      me,
    }
    console.log('firebaseData', newData)
    await setAppData({
      ...newData,
    })
    return newData
  }
  const getPersonalProfile = () =>
    firebaseApp
      .dbPersonalUser(user.uid)
      .once('value')
      .then((snapshot) => snapshot.val())

  const getChallenges = () => {
    return firebaseApp.db
      .ref('/challenges')
      .once('value')
      .then((snapshot) => snapshot.val())
  }

  const getUsers = () => {
    if (user.userRole === 'admin') {
      return firebaseApp
        .dbPrivateUsers()
        .once('value')
        .then((snapshot) => snapshot.val())
    } else {
      return firebaseApp
        .dbPublicUsers()
        .once('value')
        .then((snapshot) => snapshot.val())
    }
  }

  const getPosts = () => {
    if (user.userRole === 'default') {
      return firebaseApp
        .dbPostsByUserId(user.uid)
        .once('value')
        .then((snapshot) => snapshot.val())
    } else if (user.userRole === 'admin') {
      return firebaseApp
        .dbPosts()
        .once('value')
        .then((snapshot) => snapshot.val())
    }
  }

  const getContests = () => {
    return firebaseApp
      .dbContests()
      .once('value')
      .then((snapshot) => {
        return (
          snapshot.val() &&
          Object.entries(snapshot.val()).reduce((finalContests, entry) => {
            const uid = entry[0]
            const contest = entry[1]
            const newContest = adaptContestData(contest)
            return {
              ...finalContests,
              [uid]: newContest,
            }
          }, {})
        )
      })
  }

  const updateChallenge = (updatedChallenge) =>
    firebaseApp.dbUpdateChallenge(updatedChallenge)

  const enrollUserInContest = (userId, contestId) => {
    firebaseApp.dbEnrollUserInContest(userId, contestId)
  }

  const createContest = (contest) => firebaseApp.dbSaveNewContest(contest)
  const createUserPost = (post) => firebaseApp.dbCreateUserPost(post)
  const updateUserPost = (post) => firebaseApp.dbUpdateUserPost(post)
  const savePost = (post) => {
    if (post && post.uid) {
      console.log('Updating post', post)
      return updateUserPost(post).then(() => getPosts()).then((posts) => setAppData({ ...appData, posts }))
    } else {
      console.log('Making a new post', post)
      return createUserPost(post).then(() => getPosts()).then((posts) => setAppData({ ...appData, posts }))
    }
  }
  const updateUserChallengeTarget = (userId, challengeId, target) =>
    firebaseApp.dbSetUserChallengeTarget(userId, challengeId, target).then(() => loadFirebaseData())

  return {
    appData,
    consoleLogAppData,
    dbResetToSample,
    dbLoadSavePoint,
    loadLocalData,
    setLocalData,
    loadFirebaseData,
    savePost,
    createContest,
    updateChallenge,
    enrollUserInContest,
    updateUserChallengeTarget,
  }
}

export { DataContextProvider, useDataContext }
