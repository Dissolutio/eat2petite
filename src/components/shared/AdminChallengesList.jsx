import React from 'react'

export default function AdminChallengesList(props) {
	const { challenges } = props
	return (
		<ul>
			<h2>Admin Challenges List</h2>
			{challenges &&
				Object.keys(challenges).map(challengeKey => {
					const challenge = challenges[challengeKey]
					const { uid, challengeName, description, formulaForTarget, units } = challenge
					return (
						<li key={uid}>
							<ul>
								<li>{`uid: ${uid}`}</li>
								<li>{`challengeName: ${challengeName}`}</li>
								<li>
									<p>{`description: ${description}`}</p>
								</li>
								<li>{`formulaForTarget: ${formulaForTarget}`}</li>
								<li>{`units: ${units}`}</li>
							</ul>
						</li>
					)
				})}
		</ul>
	)
}
