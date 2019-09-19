import React from 'react'
import { Badge, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { ChallengeCardLink } from '../navigation/Links'

export default props => {
	const { challenge, match } = props
	const { uid, challengeName, description, formulaForTarget, units } = challenge
	const inDetailMode = match && match.params.id === uid
	console.log(props)
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
						{inDetailMode ? null : (
							<CardText>
								<Badge color="secondary">
									<ChallengeCardLink text="View Details / Edit" />
								</Badge>
							</CardText>
						)}
						<CardText>
							<p>Description</p>
							<p>{description}</p>
						</CardText>
						<CardText>
							<p>{`Units: ${units}`}</p>
						</CardText>
					</CardBody>
					<CardFooter>
						<CardText>
							<p>Formula For Target</p>
							<p>{formulaForTarget}</p>
						</CardText>
					</CardFooter>
				</Card>
			</Col>
		)
	)
}
