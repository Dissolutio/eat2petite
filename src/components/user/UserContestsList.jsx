import React from 'react'
import { Container } from 'reactstrap'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import UserContestCard from './UserContestCard'
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
					? userContestsArray.map((contest, index) => <UserContestCard key={index} contest={contest} />)
					: 'You have not enrolled in any contests.'}
			</div>
		</Container>
	)
}
