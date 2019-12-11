import React, { useContext, useState } from 'react'
import { format, isSameDay } from 'date-fns'

import { useFirebaseContext } from '../contexts//useFirebaseContext'
import { useAuthUserContext } from '../contexts//useAuthUserContext'
import { sampleChallenges, sampleContests } from '../sampleData'
import devDBSavePoint from '../assets/devDBSavePoint'
import { addCalculatedContestDataTo } from '../modules/adapters'

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
    /* 
    Delete all posts, challenges, contests, and each user's `/contests` and `/challengeTargets`
    Then upload challenges, contests
    Refresh data, then enroll each default user into each contest, refresh data and return newest
  */
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
  const loadFirebaseData = async () => {
    console.log('fetching Firebase Data')
    if (!user) return
    const users = getUsers()
    const challenges = getChallenges()
    const contests = getContests()
    const posts = getPosts()
    const me = getPersonalProfile()
    return Promise.all([users, challenges, contests, posts, me]).then(function (values) {
      const newData = {
        users: values[0],
        challenges: values[1],
        contests: values[2],
        posts: values[3],
        me: values[4],
      }
      setAppData({
        ...newData,
      })
      console.log("TCL: loadFirebaseData -> newData", newData)
      return newData
    })
  }
  const getPersonalProfile = () => {
    return firebaseApp
      .dbPersonalUser(user.uid)
      .once('value')
      .then((snapshot) => snapshot.val())
  }
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
    if (user.userRole === 'admin') {
      return firebaseApp
        .dbPosts()
        .once('value')
        .then((snapshot) => snapshot.val())
    } else {
      return firebaseApp
        .dbPostsByUserId(user.uid)
        .once('value')
        .then((snapshot) => snapshot.val())
    }
  }
  const getContests = () => {
    return firebaseApp
      .dbContests()
      .once('value')
      .then((snapshot) => addCalculatedContestDataTo(snapshot.val()))
  }
  const updateChallenge = (updatedChallenge) => {
    return firebaseApp.dbUpdateChallenge(updatedChallenge)
      .then(() => getChallenges())
      .then((challenges) => setAppData({ ...appData, challenges }))
  }
  const enrollUserInContest = (userId, contestId) => {
    firebaseApp.dbEnrollUserInContest(userId, contestId)
  }
  const createContest = (contest) => {
    return firebaseApp.dbSaveNewContest(contest)
  }
  const updateUserPost = (post) => {
    console.log('Updating post', post)
    return firebaseApp.dbUpdateUserPost(post)
      .then(() => getPosts())
      .then((posts) => setAppData({ ...appData, posts }))
  }
  function saveNewPost(forDate, forChallenge, forContestId) {
    const createdAt = (new Date()).toString()
    const postDate = format(new Date(forDate), 'P')
    const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
    const newPostTarget = (challengeId) => {
      const userTargetsForDate = appData.me.challengeTargetsForDates && appData.me.challengeTargetsForDates[`${format(new Date(forDate), 'yyyy-MM-dd')}`]
      const userDefaultTargets = appData.me.defaultTargets && appData.me.defaultTargets[challengeId]
      const challengeDefaultTargets = challengeId && (appData.challenges[challengeId].defaultTarget)
      return userTargetsForDate || userDefaultTargets || challengeDefaultTargets
    }
    const newPost = {
      author: appData.me.uid,
      userId: appData.me.uid,
      uid: null,
      contestId: forContestId,
      challengeId: forChallenge.uid,
      postDate,
      createdAt,
      checkedInBonus,
      targetsMet: false,
      targets: {
        challenge1: newPostTarget('challenge1'),
        challenge2: newPostTarget('challenge2'),
        challenge3: newPostTarget('challenge3'),
        challenge4: newPostTarget('challenge4'),
        challenge5: newPostTarget('challenge5'),
        challenge6: newPostTarget('challenge6'),
      },
      data: {
        challenge1: {
          quantityWaterDrank: 0,
          quantityWaterDrankUnits: "cups",
        },
        challenge2: {
          servingsVegetablesEaten: 0,
        },
        challenge3: {
          proteinConsumed: 0,
          proteinConsumedUnits: 'grams',
        },
        challenge4: {
          excerciseUnits: 'minutes',
          lightExcerciseDuration: 0,
          mediumExcerciseDuration: 0,
          heavyExcerciseDuration: 0,
        },
        challenge5: {
          refinedCarbsConsumed: 0,
          refinedCarbsConsumedUnits: 'calories',
        },
        challenge6: {
          quantitySugarConsumed: 0,
          quantitySaltConsumed: 0,
          quantitySugarConsumedUnits: 'grams',
          quantitySaltConsumedUnits: 'grams',
        },
      }
    }
    console.log('Making a new post', newPost)
    return firebaseApp.dbCreateUserPost(newPost)
      .then(() => getPosts())
      .then((posts) => setAppData({ ...appData, posts }))
  }
  const updateUserDefaultTargets = (userId, newTargets) => {
    return firebaseApp.dbSetUserDefaultTargets(userId, newTargets)
      .then(() => loadFirebaseData())
      .catch(error => {
        console.log(error)
        return error
      })
  }

  return {
    appData,
    consoleLogAppData,
    dbResetToSample,
    dbLoadSavePoint,
    loadFirebaseData,
    saveNewPost,
    updateUserPost,
    createContest,
    updateChallenge,
    enrollUserInContest,
    updateUserDefaultTargets,
  }
}
export { DataContextProvider, useDataContext }
