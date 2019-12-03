import React from 'react'
import { Button } from 'reactstrap'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const SignOutButton = (props) => {
    const firebaseApp = useFirebaseContext()
    const onSignOutButtonClick = () => firebaseApp.doSignOut()
    return (
        <Button
            {...props}
            onClick={onSignOutButtonClick}
        >
            Sign Out
        </Button>
    )
}

export default SignOutButton
