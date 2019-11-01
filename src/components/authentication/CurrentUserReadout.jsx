import React from 'react'
import { Badge, Button } from 'reactstrap'
import styled from 'styled-components'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const CurrentUserReadout = (props) => {
	const firebaseApp = useFirebaseContext()
	const { user } = props
	const onSignOutButtonClick = () => firebaseApp.doSignOut()
	if (user) {
		return (
			<StyledContainer className='mt-1'>
				<Badge pill tag="span" className='w-100' style={{ color: 'var(--white)', backgroundColor: 'var(--E2P-orange)' }}> {user.username || user.email}</Badge>
				<br />
				<Button size="sm" outline block onClick={onSignOutButtonClick}>
					Sign Out
				</Button>
			</StyledContainer>
		)
	} else {
		return null
	}
}
const StyledContainer = styled.div`
	max-width: 100px;
	button {
		color: var(--E2P-ginger);
		border-color: var(--E2P-ginger);
		font-size: .7rem;
	}
`

export default CurrentUserReadout
