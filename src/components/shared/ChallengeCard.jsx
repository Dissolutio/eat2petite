import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'

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
	const { quantityDrank, quantityDrankUnits, quickDescription } = defaultTarget
	return (
		<Card color="primary" outline key={uid} body>
			<CardHeader>
				<CardTitle>
					<h3 className='text-primary'>{challengeName}</h3>
				</CardTitle>
			</CardHeader>
			<CardBody>
				<CardText className='text-dark'>
					{description}
				</CardText>
				<CardText className='text-success'>
					General daily goal: {`${quickDescription}`}
				</CardText>
			</CardBody>
			<CardFooter>
				<Container>
					<Row className='text-info p-2'>
						<Col>Metric of measurement: {metric}</Col>
						<Col>Default units: {defaultMeasurementUnits}</Col>
					</Row>
				</Container>
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
				<CardText className='text-dark'>
					{description}
				</CardText>
				<CardText className='text-success'>
					General daily goal: {`${quickDescription}`}
				</CardText>
			</CardBody>
			<CardFooter>
				<Container>
					<Row className='text-info p-2'>
						<Col>Metric of measurement: {metric}</Col>
						<Col>Default units: {defaultMeasurementUnits}</Col>
					</Row>
				</Container>
			</CardFooter>
		</Card>
	)
}