import React from 'react'
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

export default ({ challenge }) => {
	const { uid, challengeName, description, formulaForTarget, units } = challenge
	return (
		challenge && (
			<Col sm="6">
				<Card color="primary" key={uid} body>
					<CardHeader>
						<CardTitle>
							<h3>{`challengeName: ${challengeName}`}</h3>
						</CardTitle>
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
