import React from 'react'

export default function UserContestCard(props) {
	const { contest } = props
	if (contest) {
		return <div>{contest.title}</div>
	} else {
		return null
	}
}
