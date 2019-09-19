import React from 'react'
import { Badge, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { ChallengeCardLink } from '../navigation/Links'
import { useDataContext } from '../../contexts/useDataContext'

export default function UserChallengeDetail(props) {
	const { id } = props.match.params
	const { appData } = useDataContext()
	const { challenges } = appData
	const challenge = challenges[id]
	const { uid, challengeName, description, formulaForTarget, units } = challenge
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
						<CardText>Description</CardText>
						<CardText>{description}</CardText>
						<CardText>{`Units: ${units}`}</CardText>
					</CardBody>
					<CardFooter>
						<CardText>Formula For Target</CardText>
						<CardText>{formulaForTarget}</CardText>
					</CardFooter>
				</Card>
			</Col>
		)
	)
}
