import React, { useContext, useState } from 'react'
import { useFirebaseContext } from './useFirebaseContext'
import { useAuthContext } from './useAuthContext'
import { sampleChallenges, sampleContests } from '../sampleData'

const AdminDbContext = React.createContext([{}, () => { }])

const AdminDbContextProvider = (props) => {
    const [appData, setAppData] = useState(() => {
        return {
            users: {},
            contests: {},
        }
    })
    return (
        <AdminDbContext.Provider value={[appData, setAppData]}>
            {props.children}
        </AdminDbContext.Provider>
    )
}

const useAdminDBContext = () => {
    const firebaseApp = useFirebaseContext()
    const { user } = useAuthContext()
    const [appData, setAppData] = useContext(AdminDbContext)

    const dbResetToSample = async () => {
        /* 
        Delete all posts, challenges, contests, and each user's `/contests` and `/challengeTargets`
        Then upload challenges, contests
        Refresh data, then enroll each default user into each contest
      */
        await firebaseApp.dbBlowItAllAway()
        // save all sample challenges to db
        Object.values(sampleChallenges).forEach(async (challenge) => {
            await firebaseApp.dbSetChallenge(challenge)
            return

        }
        )
        // save all sample contests to db
        Promise.all(Object.values(sampleContests).map((contest) => {
            return firebaseApp.dbSaveNewContest(contest)
        })).then(async () => {
            // fetch what we just wrote
            const newData = await loadFirebaseData()
            console.log("TCL: dbResetToSample -> newData", newData)
            // enroll all users in all contests
            Promise.all(Object.values(newData.users).map((user) => {
                if (user.userRole === 'admin') {
                    return true
                }
                if (user.userRole === 'default') {
                    Object.values(newData.contests).forEach((contest) => {
                        return firebaseApp.dbEnrollUserInContest(user.uid, contest.uid)
                    })
                }
            })).then(async () => {
                const newestData = await loadFirebaseData()
                console.log("TCL: dbResetToSample -> newestData", newestData)
                return newestData
            })
        })
    }
    const loadFirebaseData = async () => {
        if (!user) return
        const users = getUsers()
        const contests = getContests()
        return Promise.all([users, contests]).then(function (values) {
            const newData = {
                users: values[0],
                contests: values[1],
            }
            console.log("TCL: loadFirebaseData -> newData", newData)
            setAppData({
                ...newData,
            })
            return newData
        })
    }
    const getUsers = () => {
        return firebaseApp
            .dbPrivateUsers()
            .once('value')
            .then((snapshot) => snapshot.val())
    }
    const getContests = () => {
        return firebaseApp
            .dbContests()
            .once('value')
            .then((snapshot) => snapshot.val())
    }

    return {
        appData,
        dbResetToSample,
    }
}
const AdminDBConsole = () => {
    const { appData, dbResetToSample } = useAdminDBContext()
    return (
        <button
            onClick={dbResetToSample}
            style={{ fontSize: '2rem', display: 'block', width: '100%', backgroundColor: 'red' }}>
            RESET TO SAMPLE
        </button>
    )
}
export { AdminDbContextProvider, useAdminDBContext, AdminDBConsole }