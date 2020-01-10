import React from 'react'
import { Container, Card, ListGroup, ListGroupItem } from 'reactstrap'
import { useRealtimeDataContext } from 'contexts/useRealtimeDataContext'
import EditUserDefaultTargetForm from './forms/EditUserDefaultTargetForm'

function AdminUserDetail(props) {
	const { appData } = useRealtimeDataContext()
	const { adminUsers, challenges, contests } = appData
	const userId = props.match.params.id

	if (!adminUsers) { return null }

	const user = adminUsers[userId]
	if (!user) {
		return (<Container>No User Found</Container>)
	}

	const { firstName, lastName, username, email, userWeight, userHeightFeet, userHeightInches } = user
	const userContests = user.contests && Object.keys(user.contests)
	return (
		<Container>
			<Card className='p-3 text-center'>
				<h3 className='text-primary'>{`${firstName} ${lastName}`}</h3>
				<div ><small className='text-secondary'>{`username: ${username}`}</small></div>
				<div ><small className='text-secondary'>{email}</small></div>
				<div ><small className='text-secondary'>{`Weight: ${userWeight} lbs`}</small></div>
				<div ><small className='text-secondary'>{`Height: ${userHeightFeet}' ${userHeightInches}"`}</small></div>
			</Card>
			<Container>
				<ListGroup flush>
					<h5>Contests enrolled in:</h5>
					{userContests && userContests.map(contestId => {
						const contest = contests[contestId]
						return (
							<ListGroupItem key={contestId}>
								{contest.title}
							</ListGroupItem>
						)
					})}
				</ListGroup>
			</Container>
			<Container className='border border-secondary border-rounded m-2 p-2 text-center'>
				<EditUserDefaultTargetForm user={user} challenges={challenges} />
			</Container>
		</Container>
	)
}

export default AdminUserDetail
