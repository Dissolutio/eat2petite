import React from 'react'
import { Badge, } from 'reactstrap'
import styled from 'styled-components'
import SignOutButton from './SignOutButton'

const CurrentUserReadout = (props) => {
	const { user } = props
	if (user) {
		return (
			<StyledContainer className='mt-1'>
				<Badge pill tag="span" className='w-100' style={{ color: 'var(--white)', backgroundColor: 'var(--E2P-orange)' }}> {user.username || user.email}</Badge>
				<br />
				{user && <SignOutButton size="sm" outline block>
					Sign Out
				</SignOutButton>}
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
