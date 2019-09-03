import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminChallengesList(props) {
	const { challenges } = props
	return (
		<ul>
			<h2>Sample Challenges List</h2>
			{challenges.map(challenge => (
				<li key={challenge.uid}>
					<ul>
						<li>{`uid: ${challenge.uid}`}</li>
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
