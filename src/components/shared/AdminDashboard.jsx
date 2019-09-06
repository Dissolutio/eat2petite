import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

function filterAppDataAdmin(data) {
	return { ...data }
}

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const adminAppData = filterAppDataAdmin(appData)
	const { sampleUsers, posts, challenges, contests } = adminAppData
	return (
		<div>
			<h1>Admin Dashboard</h1>
			<ul>
				<h2>Sample Contests List</h2>
				{contests.map(contest => (
					<li key={contest.uid}>
						<ul>
							<li>{`title: ${contest.title}`}</li>
							<li>{`uid: ${contest.uid}`}</li>
							<li>{`dateBeginChallenge: ${contest.dateBeginChallenge}`}</li>
							<li>{`numberOfChallenges: ${contest.numberOfChallenges}`}</li>
							<li>{`challengeLengthInWeeks: ${contest.challengeLengthInWeeks}`}</li>
							<li>{`numberOfContestantsAllowed: ${contest.numberOfContestantsAllowed}`}</li>
							{/* <li>{contest.contestants}</li> */}
						</ul>
					</li>
				))}
			</ul>
			<ul>
				<h2>Sample Users List</h2>
				{sampleUsers.map(user => (
					<li key={user.uid}>
						<ul>
							<li>{`username: ${user.username}`}</li>
							<li>{`uid: ${user.uid}`}</li>
							<li>{`name: ${user.name}`}</li>
							<li>{`email: ${user.email}`}</li>
							<li>{`userRole: ${user.userRole}`}</li>
						</ul>
					</li>
				))}
			</ul>
			<ul>
				<h2>Sample Posts List</h2>
				{posts.map(post => (
					<li key={post.uid}>
						<ul>
							<li>{`uid: ${post.uid}`}</li>
							<li>{`contestId: ${post.contestId}`}</li>
							<li>{`userId: ${post.userId}`}</li>
							<li>{`challengeId: ${post.challengeId}`}</li>
							<li>{`postDate: ${post.postDate}`}</li>
							{/* <li>{post.postData}</li> */}
						</ul>
					</li>
				))}
			</ul>
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
		</div>
	)
}
