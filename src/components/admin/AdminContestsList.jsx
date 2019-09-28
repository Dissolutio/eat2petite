import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardText } from 'reactstrap'

export default function AdminContestsList(props) {
	const { contests } = props
	const contestsArray =
		contests &&
		Object.keys(contests).map(contestKey => {
			console.log(contests[contestKey])
			return contests[contestKey]
		})

	return (
		<ul>
			<h3>Admin Contests List</h3>
			{(contests &&
				contestsArray.map(contest => (
					<Card color="primary" key={contest.uid}>
						<CardHeader color="secondary">
							<h3>{`title: ${contest.title}`}</h3>
							<Link
								to={`/admin/contests/${contest.uid}`}
								style={{
									color: 'var(--font-light)',
								}}>{`Detail Page of Contest ${contest.uid}`}</Link>
						</CardHeader>
						<CardText>{`startDate: ${contest.startDate}`}</CardText>
						<CardText>{`daysPerChallenge: ${contest.daysPerChallenge}`}</CardText>
						<CardText>{`enrolledUsers object: ${contest.enrolledUsers}`}</CardText>
						<CardText>{`challenges object: ${contest.challenges}`}</CardText>
						<CardText>{`orderOfChallenges object: ${contest.orderOfChallenges}`}</CardText>
						<CardText>{`enrollmentCap: ${contest.enrollmentCap}`}</CardText>
						<CardText>{`numberOfChallenges: ${contest.numberOfChallenges}`}</CardText>
					</Card>
				))) || <div>No contests found.</div>}
		</ul>
	)
}
