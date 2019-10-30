import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'

export default function ChallengeCard(props) {
	const { challenge } = props
	if (challenge) {
		switch (challenge.uid) {
			case 'challenge1':
				return <WaterChallengeCard challenge={challenge} />
			default:
				return <DefaultChallengeCard challenge={challenge} />
		}
	} else { return null }
}
const WaterChallengeCard = ({ challenge }) => {
	const { uid, challengeName, description, metric, defaultMeasurementUnits, defaultTarget } = challenge
	const { quantityDrank, quantityDrankUnits } = defaultTarget
	return (
		<Card color="primary" outline key={uid} body>
			<CardHeader>
				<CardTitle>
					<h3 className='text-primary'>{challengeName}</h3>
				</CardTitle>
			</CardHeader>
			<CardBody>
				<CardText className='text-secondary'>
					{description}
				</CardText>
				<ListGroup>
					<ListGroupItem>Metric of measurement: {metric}</ListGroupItem>
					<ListGroupItem>Default units: {defaultMeasurementUnits}</ListGroupItem>
					<ListGroupItem>Good general goal: {`${quantityDrank} ${quantityDrankUnits}`}</ListGroupItem>
				</ListGroup>
			</CardBody>
			<CardFooter>
			</CardFooter>
		</Card>
	)
}
const DefaultChallengeCard = ({ challenge }) => {
	const { uid, challengeName, description, metric, defaultMeasurementUnits, defaultTarget } = challenge
	const { quickDescription } = defaultTarget
	return (
		<Card color="primary" outline key={uid} body>
			<CardHeader>
				<CardTitle>
					<h3 className='text-primary'>{challengeName}</h3>
				</CardTitle>
			</CardHeader>
			<CardBody>
				<CardText className='text-secondary'>
					{description}
				</CardText>
				<ListGroup>
					<ListGroupItem>Metric: {metric}</ListGroupItem>
					<ListGroupItem>Default units: {defaultMeasurementUnits}</ListGroupItem>
					<ListGroupItem>Default Target: {`${quickDescription}`}</ListGroupItem>
				</ListGroup>
			</CardBody>
			<CardFooter>
			</CardFooter>
		</Card>
	)
}