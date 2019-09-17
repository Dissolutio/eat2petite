import React from 'react'
import { Container, Badge, Button } from 'reactstrap'
import { useAuthUserContext, useFirebaseContext } from '../../firebase'

const CurrentUserReadout = () => {
	const firebaseApp = useFirebaseContext()
	const { user } = useAuthUserContext()
	const onSignOutButtonClick = () => firebaseApp.doSignOut()
	return (
		<Container>
			{user ? (
				<>
					<p>
						<small>
							Current User:
							<Badge color="primary">{user.username}</Badge>
							<br />
							<Button size="sm" block onClick={onSignOutButtonClick}>
								Sign Out
							</Button>
						</small>
					</p>
				</>
			) : (
				<small>You are not signed in.</small>
			)}
		</Container>
	)
}

export default CurrentUserReadout
