import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

const ChallengeCard = ({ challenge }) => {
	const { uid, challengeName, description, metric, defaultMeasurementUnits, defaultTargetQuickDescription } = challenge
	if (!challenge) { return null }
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
					General daily goal: {`${defaultTargetQuickDescription}`}
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
export default ChallengeCard