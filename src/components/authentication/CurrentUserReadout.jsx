import React from 'react'
import { Container, Badge, Button } from 'reactstrap'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const CurrentUserReadout = () => {
	const firebaseApp = useFirebaseContext()
	const { user } = useAuthUserContext()
	const onSignOutButtonClick = () => firebaseApp.doSignOut()
	return (
		<Container>
			{user ? (
				<>
					<p style={{ color: 'var(--E2P-ginger' }}>
						<small>
							Current User:
							<Badge color="primary">{user.username || user.email}</Badge>
							<br />
							<Button size="sm" block onClick={onSignOutButtonClick}>
								Sign Out
							</Button>
						</small>
					</p>
				</>
			) : null}
		</Container>
	)
}

export default CurrentUserReadout
