import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { AdminChallengeDetailLink } from '../layout/Links'

export default function AdminChallengesList(props) {
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
								<AdminChallengeDetailLink id={uid}>
									<h3>{challengeName}</h3>
								</AdminChallengeDetailLink>
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
