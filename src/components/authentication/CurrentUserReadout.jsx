import React from 'react'
import { useAuthUserContext, useFirebaseContext } from '../../firebase'

const CurrentUserReadout = () => {
    const firebaseApp = useFirebaseContext()
    const { user } = useAuthUserContext()
    const onSignOutButtonClick = () => firebaseApp.doSignOut()
    return (
        <p>
            {user ? (
                <>
                    <small>You are signed in as: {user.username}</small>
                    <button onClick={onSignOutButtonClick}>Sign Out</button>
                </>
            ) : (
                <small>You are not signed in.</small>
            )}
        </p>
    )
}

export default CurrentUserReadout
