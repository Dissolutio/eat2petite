import React from 'react'
import { Container, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'

export default function AdminContestDetail(props) {

	const { appData } = useDataContext()
	const { contests, users } = appData
	const contestId = props.match.params.id
	const contest = contests[contestId]
	const endDate = new Date()
	if (contest) {
		const { uid, title, startDate } = contest
		const enrolledUsers = contest.enrolledUsers ?
			Object.keys(contest.enrolledUsers).map(key => users[key])
			: []
		return (
			<Container>
				<Card color="primary" outline key={uid} body>
					<CardHeader>
						<CardTitle>
							{title}
						</CardTitle>
					</CardHeader>
					<CardBody>
						<CardText>
							Begins: {startDate}
						</CardText>
						<CardText>
							Ends: {endDate.toDateString()}
						</CardText>
					</CardBody>
					<CardFooter>
						{enrolledUsers ? (
							<ListGroup><h4>Enrolled Users</h4>
								{enrolledUsers.map(user => <ListGroupItem key={user.uid}>{user.username}</ListGroupItem>)}
							</ListGroup>
						)
							: (<CardText>No users enrolled yet!</CardText>)
						}
					</CardFooter>
				</Card>
			</Container>
		)
	} else {
		return null
	}
}