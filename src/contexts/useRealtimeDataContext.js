import React, { useContext, useEffect } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer';
import { format, isSameDay } from 'date-fns'

import { useFirebaseContext, useAuthContext } from 'contexts'
import { postChallengeData } from '../sampleData'
import { adaptContests } from 'helpers'

const RealtimeDataContext = React.createContext([{}, () => { }])

const initialState = {
    personalProfile: null,
    challenges: null,
    contests: null,
    userPosts: null,
    userUsers: null,
    adminPosts: null,
    adminUsers: null,
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
            return state
    }
}

const RealtimeDataContextProvider = (props) => {
    const [state, dispatch] = useThunkReducer(reducer, initialState);

    return (
        <RealtimeDataContext.Provider value={[state, dispatch]}>
            {props.children}
        </RealtimeDataContext.Provider>
    )
}

const useRealtimeDataContext = () => {
    const firebaseApp = useFirebaseContext()
    const { user } = useAuthContext()
    const [appData, dispatch] = useContext(RealtimeDataContext);

    // ATTACH LISTENERS
    useEffect(() => {
        if (!user) { return }
        const personalProfileRef = firebaseApp.dbPersonalUser(user.uid)
        const challengesRef = firebaseApp.dbChallenges()
        const contestsRef = firebaseApp.dbContests()
        const userPostsRef = firebaseApp.dbPostsByUserId(user.uid)
        const userUsersRef = firebaseApp.dbPublicUsers()
        const adminPostsRef = firebaseApp.dbPosts()
        const adminUsersRef = firebaseApp.dbPrivateUsers()
        async function attachFirebaseRDSListeners() {
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
                    payload: adaptContests(snapshot.val())
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
        }
        attachFirebaseRDSListeners()
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

    function createContest(contest) {
        return firebaseApp.dbSaveNewContest(contest)
    }
    function enrollUserInContest(userId, contestId) {
        firebaseApp.dbEnrollUserInContest(userId, contestId)
    }
    function saveNewPost(forDate, forChallenge, forContestId) {
        const createdAt = (new Date()).toString()
        const postDate = format(new Date(forDate), 'yyyy-MM-dd')
        const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
        const newPostTarget = (challengeId) => {
            const userTargetsForDate = appData.personalProfile.challengeTargetsForDates && appData.personalProfile.challengeTargetsForDates[`${format(new Date(forDate), 'yyyy-MM-dd')}`]
            const userDefaultTargets = appData.personalProfile.defaultTargets && appData.personalProfile.defaultTargets[challengeId]
            const challengeDefaultTargets = challengeId && (appData.challenges[challengeId].defaultTarget)
            return userTargetsForDate || userDefaultTargets || challengeDefaultTargets
        }
        const postUid = `${postDate}${forContestId}`
        const newPost = {
            author: appData.personalProfile.uid,
            userId: appData.personalProfile.uid,
            uid: postUid,
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
            data: { ...postChallengeData }
        }
        console.log('Making a new post', newPost)
        return firebaseApp.dbSaveUserPost(newPost)
    }
    function updateUserPost(post) {
        console.log('Updating post', post)
        return firebaseApp.dbSaveUserPost(post)
    }
    function updateChallenge(updatedChallenge) {
        return firebaseApp.dbUpdateChallenge(updatedChallenge)
    }
    function updateUserDefaultTargets(userId, newTargets) {
        return firebaseApp.dbSetUserDefaultTargets(userId, newTargets)
    }
    return {
        appData,
        createContest,
        enrollUserInContest,
        saveNewPost,
        updateUserPost,
        updateChallenge,
        updateUserDefaultTargets
    }
}

export { RealtimeDataContextProvider, useRealtimeDataContext }