import React from 'react'
import { Badge, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { ChallengeCardLink } from '../navigation/Links'

export default props => {
	const { challenge, match } = props
	const { uid, challengeName, description, formulaForTarget, units } = challenge
	const inDetailMode = match && match.params.id === uid
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
									<ChallengeCardLink uid={uid}>Edit Challenge</ChallengeCardLink>
							</CardText>
						)}
						<CardText>
							Description
							{description}
						</CardText>
						<CardText>{`Units: ${units}`}</CardText>
					</CardBody>
					<CardFooter>
						<CardText>
							Formula For Target
							{formulaForTarget}
						</CardText>
					</CardFooter>
				</Card>
			</Col>
		)
	)
}
