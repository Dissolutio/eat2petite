import React from 'react'
import { Container, Badge, Button } from 'reactstrap'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const CurrentUserReadout = (props) => {
	const firebaseApp = useFirebaseContext()
	const { user } = props
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
