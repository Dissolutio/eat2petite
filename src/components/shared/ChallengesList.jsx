import React from 'react'
import { Container, Collapse, Button, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

export default function ChallengesList(props) {
	const { challenges } = props
	if (challenges) {
		return (
			<Container>
				<h2>All Challenges:</h2>
				{Object.values(challenges).map(challenge => {
					return (
						<ChallengeCollapseCard key={challenge.uid} challenge={challenge} />
					)
				})}
			</Container>
		)
	} else {
		return (
			<div>No challenges found</div>
		)
	}
}
export const ChallengeCollapseCard = ({ challenge }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	if (!challenge) { return null }

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }} block>{challenge.challengeName} {isOpen ? (<span>&#9650;</span>) : (<span>&#9660;</span>)}</Button>
			<Collapse isOpen={isOpen}>
				<ChallengeCard challenge={challenge} />
			</Collapse>
		</div>
	);
}

export const ChallengeCard = ({ challenge }) => {
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