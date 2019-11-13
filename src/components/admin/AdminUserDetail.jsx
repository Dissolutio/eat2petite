import React from 'react'
import { Container, Card, ListGroup, ListGroupItem } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { AdminContestDashboardLink } from '../layout/Links'
import UserTargetEdit from './UserTargetEdit/UserTargetEdit'

function AdminUserDetail(props) {
	const { users, challenges, contests } = props
	const userId = props.match.params.id
	const user = users[userId]

	if (user) {
		const { firstName, lastName, username, email, userWeight, userHeightFeet, userHeightInches } = user
		const userContests = user.contests && Object.keys(user.contests)
		return (
			<Container>
				<Card className='p-3'>
					<h3 className='text-primary'>{`${firstName} ${lastName}`}</h3>
					<div className="text-center"><small className='text-secondary'>{`username: ${username}`}</small></div>
					<div className="text-center"><small className='text-secondary'>{email}</small></div>
					<div className="text-center"><small className='text-secondary'>{`Weight: ${userWeight} lbs`}</small></div>
					<div className="text-center"><small className='text-secondary'>{`Height: ${userHeightFeet}' ${userHeightInches}"`}</small></div>
				</Card>
				<Card className='p-4'>
					<ListGroup>
						<h5>User's contests:</h5>
						{userContests && userContests.map(contestId => {
							const contest = contests[contestId]
							return (
								<ListGroupItem key={contestId}>
									<AdminContestDashboardLink contestId={contestId}>
										{`${contest.title}`}
									</AdminContestDashboardLink>
								</ListGroupItem>
							)
						})}
					</ListGroup>
				</Card>
				<UserTargetEdit user={user} challenges={challenges} />
			</Container>
		)
	} else {
		return (<Container>No User Found</Container>)
	}
}

export default withRouter(AdminUserDetail)
