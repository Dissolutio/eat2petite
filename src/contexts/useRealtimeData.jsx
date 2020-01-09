import React, { useContext, useEffect } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer';
import { format, isSameDay } from 'date-fns'

import { useFirebaseContext } from 'contexts/useFirebaseContext'
import { useAuthUserContext } from 'contexts/useAuthUserContext'
import { addCalculatedContestDataTo } from 'modules/adapters'

const RealtimeDataContext = React.createContext([{}, () => { }])

const initialState = {
    personalProfile: {},
    challenges: {},
    contests: {},
    userPosts: {},
    userUsers: {},
    adminPosts: {},
    adminUsers: {},
}
function reducer(state, action) {
    switch (action.type) {
        case 'fetch_personal_profile':
            return { ...state, personalProfile: action.payload };
        case 'fetch_challenges':
            return { ...state, challenges: action.payload };
        case 'fetch_contests':
            return { ...state, contests: action.payload };
        case 'fetch_user_users':
            return { ...state, userUsers: action.payload };
        case 'fetch_user_posts':
            return { ...state, userPosts: action.payload };
        case 'fetch_admin_posts':
            return { ...state, adminPosts: action.payload };
        case 'fetch_admin_users':
            return { ...state, adminUsers: action.payload };
        default:
            throw new Error();
    }
}

export const RealtimeDataContextProvider = (props) => {
    const [state, dispatch] = useThunkReducer(reducer, initialState);

    return (
        <RealtimeDataContext.Provider value={[state, dispatch]}>
            {props.children}
        </RealtimeDataContext.Provider>
    )
}

export const useRealtimeData = () => {
    const firebaseApp = useFirebaseContext()
    const { user } = useAuthUserContext()
    const [appData, dispatch] = useContext(RealtimeDataContext);
    const [initializing, setInitializing] = React.useState(true)
    const personalProfileRef = firebaseApp.dbPersonalUser(user.uid)
    const challengesRef = firebaseApp.dbChallenges()
    const contestsRef = firebaseApp.dbContests()
    const userPostsRef = firebaseApp.dbPostsByUserId(user.uid)
    const userUsersRef = firebaseApp.dbPublicUsers()
    const adminPostsRef = firebaseApp.dbPosts()
    const adminUsersRef = firebaseApp.dbPrivateUsers()

    // ATTACH LISTENERS
    useEffect(() => {
        setInitializing(false)
        if (!user.uid) {
            return
        }
        personalProfileRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_personal_profile',
                payload: snapshot.val()
            })
        })
        challengesRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_challenges',
                payload: snapshot.val()
            })
        })
        contestsRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_contests',
                payload: addCalculatedContestDataTo(snapshot.val())
            })
        })
        userPostsRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_user_posts',
                payload: snapshot.val()
            })
        })
        userUsersRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_user_users',
                payload: snapshot.val()
            })
        })
        adminPostsRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_admin_posts',
                payload: snapshot.val()
            })
        })
        adminUsersRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_admin_users',
                payload: snapshot.val()
            })
        })
        return () => {
            personalProfileRef.off()
            challengesRef.off()
            contestsRef.off()
            userPostsRef.off()
            userUsersRef.off()
            adminPostsRef.off()
            adminUsersRef.off()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createContest = (contest, usersToEnroll) => {
        return firebaseApp.dbSaveNewContest(contest)
    }
    const enrollUserInContest = (userId, contestId) => {
        firebaseApp.dbEnrollUserInContest(userId, contestId)
    }
    function saveNewPost(forDate, forChallenge, forContestId) {
        const createdAt = (new Date()).toString()
        const postDate = format(new Date(forDate), 'P')
        const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
        const newPostTarget = (challengeId) => {
            const userTargetsForDate = appData.personalProfile.challengeTargetsForDates && appData.personalProfile.challengeTargetsForDates[`${format(new Date(forDate), 'yyyy-MM-dd')}`]
            const userDefaultTargets = appData.personalProfile.defaultTargets && appData.personalProfile.defaultTargets[challengeId]
            const challengeDefaultTargets = challengeId && (appData.challenges[challengeId].defaultTarget)
            return userTargetsForDate || userDefaultTargets || challengeDefaultTargets
        }
        const newPost = {
            author: appData.personalProfile.uid,
            userId: appData.personalProfile.uid,
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
    }
    function updateUserPost(post) {
        console.log('Updating post', post)
        return firebaseApp.dbUpdateUserPost(post)
    }
    return {
        initializing,
        appData,
        createContest,
        enrollUserInContest,
        saveNewPost,
        updateUserPost
    }
}

