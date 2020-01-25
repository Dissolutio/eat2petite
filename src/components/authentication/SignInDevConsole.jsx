import React from 'react'
import { Container, Button } from 'reactstrap'

import { useFirebaseContext } from 'contexts'
import { sampleUsers } from 'sampleData'

export default function SignInDevConsole(props) {
    const firebaseApp = useFirebaseContext()
    const { setFormError } = props
    const signInAsSampleUser = email => {
        firebaseApp.doSignInWithEmailAndPassword(email, 'password').catch(error => {
            console.log(error)
            setFormError(error)
        })
    }
    return (
        <Container className="p-1 mt-5 mb-3">
            {sampleUsers ? Object.values(sampleUsers).map(sampleUser => {
                const { username, email, uid } = sampleUser
                return (
                    <Button
                        key={uid}
                        onClick={() => signInAsSampleUser(email)}
                        block
                        size="sm"
                        color="warning">
                        Sign in as {`${username}`}
                    </Button>
                )
            }) : null}
        </Container>
    )
}
