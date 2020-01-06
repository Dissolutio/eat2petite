import React, { useContext, useEffect } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer';

import { useFirebaseContext } from 'contexts/useFirebaseContext'
import { useAuthUserContext } from '../contexts/useAuthUserContext'

const RealtimeDataContext = React.createContext([{}, () => { }])

const initialState = {
    personalProfile: {},
    userUsers: {},
    adminUsers: {},
    challenges: {},
    contests: {},
    userPosts: {},
    adminPosts: {},
}
function reducer(state, action) {
    switch (action.type) {
        case 'fetch_personal_profile':
            return { ...state, personalProfile: action.payload };
        case 'fetch_user_users':
            return { ...state, userUsers: action.payload };
        case 'fetch_admin_users':
            return { ...state, adminUsers: action.payload };
        case 'fetch_challenges':
            return { ...state, challenges: action.payload };
        case 'fetch_user_posts':
            return { ...state, userPosts: action.payload };
        case 'fetch_admin_posts':
            return { ...state, adminPosts: action.payload };
        case 'fetch_contests':
            return { ...state, contests: action.payload };

        case 'update_challenge':
            const updatedChallenge = action.payload
            return { ...state };
        case 'enroll_user_in_contest':
            const { userId, contestId } = action.payload
            return { ...state };
        case 'create_contest':
            const newContest = action.payload
            return { ...state };
        case 'create_post':
            return { ...state };
        case 'update_post':
            return { ...state };
        case 'update_user_default_targets':
            return { ...state };
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
    const [state, dispatch] = useContext(RealtimeDataContext);

    const personalProfileRef = firebaseApp.dbPersonalUser(user.uid)
    const userUsersRef = firebaseApp.dbPublicUsers()
    const adminUsersRef = firebaseApp.dbPrivateUsers()
    const challengesRef = firebaseApp.dbChallenges()
    const contestsRef = firebaseApp.dbContests()
    const userPostsRef = firebaseApp.dbPostsByUserId(user.uid)
    const adminPostsRef = firebaseApp.dbPosts()

    useEffect(() => {
        personalProfileRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_personal_profile',
                payload: snapshot.val()
            })
        })
        userUsersRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_user_users',
                payload: snapshot.val()
            })
        })
        adminUsersRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_admin_users',
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
                payload: snapshot.val()
            })
        })
        userPostsRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_user_posts',
                payload: snapshot.val()
            })
        })
        adminPostsRef.on("value", snapshot => {
            dispatch({
                type: 'fetch_admin_posts',
                payload: snapshot.val()
            })
        })
        return () => {
            personalProfileRef.off()
            userUsersRef.off()
            adminUsersRef.off()
            challengesRef.off()
            contestsRef.off()
            userPostsRef.off()
            adminPostsRef.off()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(state)
    return {
        state
    }
}

