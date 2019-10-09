import React from 'react'
import { Container, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'

export default function AdminContestDetail(props) {

	const { appData } = useDataContext()
	const { contests, users, challenges } = appData
	const contestId = props.match.params.id
	const contest = contests && contests[contestId]
	const endDate = new Date()
	if (contest) {
		const { uid, title, startDate, enrolledUsers, orderOfChallenges } = contest
		const enrolledUsersArray = enrolledUsers && Object.keys(contest.enrolledUsers).map(key => users[key])
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
						{enrolledUsersArray ? (
							<ListGroup><h4>Enrolled Users</h4>
								{enrolledUsersArray.map(user => <ListGroupItem key={user.uid}>{user.username}</ListGroupItem>)}
							</ListGroup>
						)
							: (<CardText>No users enrolled yet!</CardText>)
						}
						{orderOfChallenges ? (<ListGroup><h4>Challenge Order</h4>
							{Object.keys(orderOfChallenges).map(order => {
								const challengeId = orderOfChallenges[order]
								const challenge = challenges[challengeId]
								return (
									<ListGroupItem key={challenge.uid}><span>{`${order}: `}</span><span>{`${challenge.challengeName}`}</span></ListGroupItem>
								)
							})}
						</ListGroup>) : (<CardText>No Challenges added!</CardText>)}
					</CardFooter>
				</Card>
			</Container>
		)
	} else {
		return <Container>No contest found!</Container>
	}
}