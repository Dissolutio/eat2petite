import React from 'react'
import { chunk } from 'lodash'
import { Container, Row } from 'reactstrap'

import ChallengeCard from '../shared/ChallengeCard'

export default function AdminChallengesList(props) {
	const { challenges } = props
	const challengesArray = challenges && Object.keys(challenges).map(challengeKey => challenges[challengeKey])
	const challengeChunks = chunk(challengesArray, 2)
	return (
		<Container>
			<h3>Admin Challenges List</h3>
			{challengesArray ? (
				challengeChunks.map((chunk, index) => <Card2x2 key={index} chunk={chunk} />)
			) : (
				<div>No challenges found.</div>
			)}
		</Container>
	)
}
const Card2x2 = ({ chunk }) => {
	return (
		<Row>
			{chunk &&
				chunk.length &&
				chunk.map((challenge, index) => <ChallengeCard key={index} challenge={challenge} />)}
		</Row>
	)
}
