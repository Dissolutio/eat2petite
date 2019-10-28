import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { UserChallengeDetailLink } from '../layout/Links'

export default function UserChallengesList(props) {
	const { challenges } = props
	return (
		<ul>
			<h2>All Challenges:</h2>
			{challenges ? (
				<ListGroup>
					{Object.keys(challenges).map(challengeKey => {
						const challenge = challenges[challengeKey]
						const { uid, challengeName } = challenge
						return (
							<ListGroupItem color="primary" key={uid}>
								<UserChallengeDetailLink challengeId={uid}>
									<h3>{challengeName}</h3>
								</UserChallengeDetailLink>
							</ListGroupItem>
						)
					})}
				</ListGroup>
			) : (
					<div>No challenges found</div>
				)}
		</ul>
	)
}
