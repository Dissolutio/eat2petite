import React from 'react'
import { chunk } from 'lodash'
import { Row } from 'reactstrap'

import ChallengeCard from './ChallengeCard'

export default function ChallengesList(props) {
	const { challenges } = props
	const challengesArray = Object.keys(challenges).map(challengeKey => challenges[challengeKey])
	const challengeChunks = chunk(challengesArray, 2)
	return <>{challengeChunks && challengeChunks.map((chunk, index) => <Card2x2 key={index} chunk={chunk} />)}</>
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
