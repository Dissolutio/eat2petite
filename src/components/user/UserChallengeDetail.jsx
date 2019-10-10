import React from 'react'
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'

export default function UserChallengeDetail(props) {
	const { id } = props.match.params
	const { appData } = useDataContext()
	const { challenges } = appData
	const challenge = challenges[id]
	const { uid, challengeName, description, units } = challenge
	return (
		challenge && (
			<Col sm="6">
				<Card color="primary" outline key={uid} body>
					<CardHeader>
						<CardTitle>
							<h3>{challengeName}</h3>
						</CardTitle>
					</CardHeader>
					<CardBody>
						<h6>Description:</h6>
						<CardText>{description}</CardText>
						<CardText>{`Units: ${units}`}</CardText>
					</CardBody>
					<CardFooter>
					</CardFooter>
				</Card>
			</Col>
		)
	)
}
