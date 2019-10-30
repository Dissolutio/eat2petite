import React from 'react'
import { Container, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import { AdminUserDetailLink } from '../layout/Links'
import { ordinalSuffixOf } from '../../modules/functions'

export default function AdminContestDetail(props) {
	const { appData } = useDataContext()
	const { contests, users, challenges } = appData
	const contestId = props.match.params.id
	const contest = contests && contests[contestId]
	if (contest) {
		const { uid, title, startDate, endDate, enrolledUsers, orderOfChallenges } = contest
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
							Ends: {endDate}
						</CardText>
					</CardBody>
					<CardFooter>
						{enrolledUsersArray ? (
							<ListGroup><h4>Enrolled Users</h4>
								{enrolledUsersArray.map(user => <ListGroupItem key={user.uid}>
									<AdminUserDetailLink id={user.uid}>{user.username}</AdminUserDetailLink>
								</ListGroupItem>)}
							</ListGroup>
						)
							: (<CardText>No users enrolled yet!</CardText>)
						}
						{orderOfChallenges
							? (<ListGroup><h4>Challenge Order</h4>
								{Object.entries(orderOfChallenges).map((entry) => {
									const orderSpot = entry[0]
									const challengeUid = entry[1]
									const challenge = challenges[challengeUid]
									return (
										<ListGroupItem key={`${challenge.uid}--${orderSpot}`}>
											<span>{`${ordinalSuffixOf(parseInt(orderSpot) + 1)}: `}</span>
											<span>{`${challenge.challengeName}`}</span>
										</ListGroupItem>
									)
								})}
							</ListGroup>)
							: (<CardText>No Challenges added!</CardText>)}
					</CardFooter>
				</Card>
			</Container>
		)
	} else {
		return <Container>No contest found!</Container>
	}
}