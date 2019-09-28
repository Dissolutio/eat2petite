import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { UserChallengeDetailLink } from '../navigation/Links'

export default function UserChallengesList(props) {
	const { challenges } = props
	// const challengesArray = Object.keys(challenges).map(challengeKey => challenges[challengeKey])
	return (
		<ul>
			<h2>User Challenges List</h2>
			{challenges ? (
				<ul>
					{Object.keys(challenges).map(challengeKey => {
						const challenge = challenges[challengeKey]
						const { uid, challengeName, description, formulaForTarget, units } = challenge
						return (
							<li key={uid}>
								<Card color="primary" outline key={uid} body>
									<CardHeader>
										<UserChallengeDetailLink id={uid} />
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
							</li>
						)
					})}
				</ul>
			) : (
				<div>No challenges found</div>
			)}
		</ul>
	)
}
