import React from 'react'
import { UserChallengeDetailLink } from '../navigation/Links'

export default function UserChallengesList(props) {
	const { challenges } = props
	// const challengesArray = Object.keys(challenges).map(challengeKey => challenges[challengeKey])
	return (
		<ul>
			<h2>Sample Challenges List</h2>
			{challenges ? (
				Object.keys(challenges).map(challengeKey => {
					const challenge = challenges[challengeKey]
					const { uid, challengeName, description, formulaForTarget, units } = challenge
					return (
						<li key={uid}>
							<ul>
								<li>
									<UserChallengeDetailLink id={uid} />
								</li>
								<li>{`challengeName: ${challengeName}`}</li>
								<li>
									<p>{`description: ${description}`}</p>
								</li>
								<li>{`formulaForTarget: ${formulaForTarget}`}</li>
								<li>{`units: ${units}`}</li>
							</ul>
						</li>
					)
				})
			) : (
				<div>No challenges found</div>
			)}
		</ul>
	)
}
