import React from 'react'
import { Container } from 'reactstrap'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import UserContestLinkButton from './UserContestCard'
export default function UserContestsList(props) {
	const { user } = useAuthUserContext()
	const userContestsArray =
		user.contests && props.contests
			? Object.keys(user.contests).map(userContestsKey => props.contests[userContestsKey])
			: null
	return (
		<Container>
			<h2>Your Contests</h2>
			<div>
				{userContestsArray
					? userContestsArray.map((contest, index) => <UserContestLinkButton key={index} contest={contest} />)
					: 'You are not enrolled in any contests.'}
			</div>
		</Container>
	)
}
