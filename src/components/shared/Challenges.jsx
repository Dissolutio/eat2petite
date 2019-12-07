import React, { useState } from 'react'
import { Container, Collapse, Button, Row, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import EditChallengeForm from '../admin/forms/EditChallengeForm'
export const ChallengesPage = ({ challenges, admin }) => {
	return (
		<Container>
			<h2>All Challenges:</h2>
			<ChallengeCardList admin={admin} challenges={challenges} />
		</Container>
	)
}
const ChallengeCardList = ({ challenges, admin }) => {
	return (
		<div>
			{challenges && Object.values(challenges).map(challenge => {
				return (
					<ChallengeCollapseCard key={challenge.uid} admin={admin} challenge={challenge} />
				)
			})}
		</div>
	)
}
export const ChallengeCollapseCard = ({ challenge, admin }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	if (!challenge) { return null }
	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }} block>{challenge.challengeName} {isOpen ? (<span>&#9650;</span>) : (<span>&#9660;</span>)}</Button>
			<Collapse isOpen={isOpen}>
				{admin ?
					<EditableChallengeCard challenge={challenge} />
					:
					<ChallengeCard challenge={challenge} />
				}
			</Collapse>
		</div>
	);
}

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
const EditableChallengeCard = ({ challenge }) => {
	const [activeEdit, setActiveEdit] = useState(false)
	if (!challenge) return null
	return (
		<>
			<Button
				outline
				className='m-2 p-1'
				onClick={() => setActiveEdit((state) => !state)}
			>
				{activeEdit ? `Discard Changes` : `Toggle Edit Mode`}
			</Button>
			{
				activeEdit ?
					<EditChallengeForm challenge={challenge} />
					:
					<ChallengeCard challenge={challenge} />
			}
		</>
	)
}