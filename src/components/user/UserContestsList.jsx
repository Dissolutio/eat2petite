import React from 'react'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import UserContestCard from './UserContestCard'
export default function UserContestsList(props) {
	const { user } = useAuthUserContext()
	const contests = Object.keys(user.contests).map(userContestsKey => props.contests[userContestsKey])
	return (
		<>
			<h2>Your Contests</h2>
			<div>{contests && contests.map((contest, index) => <UserContestCard key={index} contest={contest} />)}</div>
		</>
	)
}
