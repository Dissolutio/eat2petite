import React from 'react'
import { Link } from 'react-router-dom'

export default function ContestsList(props) {
	const { contests } = props
	return (
		<ul>
			<h2>Sample Contests List</h2>
			{contests.map(contest => (
				<li key={contest.uid}>
					<ul>
						<li>{`title: ${contest.title}`}</li>
						<li>
							<Link to={`/user/admin/contests/${contest.uid}`}>{`uid: ${contest.uid}`}</Link>
						</li>
						<li>{`dateBeginChallenge: ${contest.dateBeginChallenge}`}</li>
						<li>{`numberOfChallenges: ${contest.numberOfChallenges}`}</li>
						<li>{`challengeLengthInWeeks: ${contest.challengeLengthInWeeks}`}</li>
						<li>{`numberOfContestantsAllowed: ${contest.numberOfContestantsAllowed}`}</li>
						{/* <li>{contest.contestants}</li> */}
					</ul>
				</li>
			))}
		</ul>
	)
}
