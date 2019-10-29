import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

export default function ChallengeCard(props) {
	const { challenge } = props
	if (challenge) {

		const { uid, challengeName, description, units } = challenge
		return (
			<Card color="primary" outline key={uid} body>
				<CardHeader>
					<CardTitle>
						<h3>{challengeName}</h3>
					</CardTitle>
				</CardHeader>
				<CardBody>
					<h5>Description</h5>
					<CardText>
						{description}
					</CardText>
					<CardText>{`Units: ${units}`}</CardText>
				</CardBody>
				<CardFooter>
				</CardFooter>
			</Card>
		)
	} else {
		return "No Challenge"
	}
}
