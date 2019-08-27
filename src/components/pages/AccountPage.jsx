import React from 'react'
import { useAuthUserContext, useFirebaseContext } from '../../firebase'

export default function AccountPage(props) {
    const firebaseApp = useFirebaseContext()
    const { user } = useAuthUserContext()
    return (
        <div>
            AccountPage! Where authenticated users view and edit their account info!
            {user && (
                <ul>
                    {Object.keys(user).map(key => {
                        const userKey = key.toString()
                        const userValue = user[key].toString()
                        return <li>{`${userKey}: ${userValue}`}</li>
                    })}
                </ul>
            )}
            <button onClick={firebaseApp.doSignOut}>Sign Out</button>
        </div>
    )
}
