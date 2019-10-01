import React, { useState } from 'react'
import { Container, Button } from 'reactstrap'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

export default function VerifyEmail() {
  const [isSent, setIsSent] = useState(false)
  const firebaseApp = useFirebaseContext()
  const sendEmail = event => {
    event.preventDefault()
    firebaseApp.doSendEmailVerification()
    setIsSent(true)
  }
  return (
    <Container>
      {isSent ? (
        <h4>Verification Email Sent!</h4>
      ) : (
          <>
            <p>
              In order to allow access to your account information, we just need
              to make sure it's you!
          </p>
            <p>
              Send yourself an email from us and follow the link back to here!
          </p>
            <Container>
              <Button color='primary' size='lg' onClick={sendEmail}>
                Send Verification Email
            </Button>
            </Container>
          </>
        )}
    </Container>
  )
}
