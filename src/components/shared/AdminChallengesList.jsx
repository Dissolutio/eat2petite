import React from 'react'
import { Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, Button } from 'reactstrap'
import { chunk } from 'lodash'

export default function AdminChallengesList(props) {
	const { challenges } = props
	const challengesArray = Object.keys(challenges).map(challengeKey => challenges[challengeKey])
	const challengeChunks = chunk(challengesArray, 2)
	return (
		<>
			{challengeChunks &&
				challengeChunks.length &&
				challengeChunks.map((chunk, index) => <Card2x2 key={index} chunk={chunk} />)}
		</>
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
const ChallengeCard = ({ challenge }) => {
	const { uid, challengeName, description, formulaForTarget, units } = challenge
	return (
		challenge && (
			<Col sm="6">
				<Card color="primary" key={uid} body>
					<CardHeader>
						<CardTitle>{`challengeName: ${challengeName}`}</CardTitle>
					</CardHeader>
					<CardBody>
						<CardText>{`uid: ${uid}`}</CardText>
						<CardText>{`description: ${description}`}</CardText>
						<CardText>{`units: ${units}`}</CardText>
					</CardBody>
					<CardFooter>
						<CardText>{`formulaForTarget: ${formulaForTarget}`}</CardText>
					</CardFooter>
				</Card>
			</Col>
		)
	)
}
