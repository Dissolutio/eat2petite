import React from 'react'
import { Badge, Button } from 'reactstrap'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const CurrentUserReadout = (props) => {
	const firebaseApp = useFirebaseContext()
	const { user } = props
	const onSignOutButtonClick = () => firebaseApp.doSignOut()
	if (user) {
		return (
			<div className='mt-1' style={{ maxWidth: '100px' }}>
				<Badge className='w-100' style={{ color: 'var(--white)', backgroundColor: 'var(--E2P-orange)' }}> {user.username || user.email}</Badge>
				<br />
				<Button style={{ fontSize: '.7rem' }} size="sm" outline block onClick={onSignOutButtonClick}>
					Sign Out
				</Button>
			</div>
		)
	} else {
		return null
	}
}

export default CurrentUserReadout
