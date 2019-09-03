import React from 'react'
import { UserChallengeDetailLink } from '../navigation/Links'

export default function UserChallengesList(props) {
	const { challenges } = props
	return (
		<ul>
			<h2>Sample Challenges List</h2>
			{challenges.map(challenge => (
				<li key={challenge.uid}>
					<ul>
						<li>
							<UserChallengeDetailLink id={challenge.uid} />
						</li>
						<li>{`challengeName: ${challenge.challengeName}`}</li>
						<li>
							<p>{`description: ${challenge.description}`}</p>
						</li>
						<li>{`formulaForTarget: ${challenge.formulaForTarget}`}</li>
						<li>{`units: ${challenge.units}`}</li>
					</ul>
				</li>
			))}
		</ul>
	)
}
