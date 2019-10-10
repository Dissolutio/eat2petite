import React from 'react'
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

export default props => {
	const { challenge } = props
	const { uid, challengeName, description, units } = challenge
	return (
		challenge && (
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
	)
}
