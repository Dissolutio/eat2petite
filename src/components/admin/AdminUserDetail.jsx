import React from 'react'
import { Container, Card, ListGroup, ListGroupItem } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { AdminContestDetailLink } from '../layout/Links'
import EditUserChallengeTargetsSection from './UserTargetForms/index'

function AdminUserDetail(props) {
	const { users, challenges, contests } = props
	const { id } = props.match.params
	const user = users && users[id]

	if (user) {
		const { uid, firstName, lastName, username, email, userWeight, userHeightFeet, userHeightInches } = user
		const userContests = user.contests && Object.keys(user.contests)
		return (
			<Container>
				<Card className='p-3'>
					<h3 className='text-primary'>{`${firstName} ${lastName}`}</h3>
					<div className="text-center"><small className='text-info'>{`username: ${username}`}</small></div>
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
									<AdminContestDetailLink id={contestId}>
										{`${contest.title}`}
									</AdminContestDetailLink>
								</ListGroupItem>
							)
						})}
					</ListGroup>
				</Card>
				<EditUserChallengeTargetsSection user={user} challenges={challenges} />
			</Container>
		)
	} else {
		return (<Container>No User Found</Container>)
	}
}

export default withRouter(AdminUserDetail)
