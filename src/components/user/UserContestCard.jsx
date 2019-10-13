import React from 'react'
import { Card, CardHeader, CardBody, CardText } from 'reactstrap'
import { format } from 'date-fns'

export default function UserContestCard(props) {
	const { contest } = props
	if (contest) {
		const { daysPerChallenge, numberOfChallenges, startDate } = contest
		return (
			<Card>
				<CardHeader><h5>{contest.title}</h5></CardHeader>
				<CardBody>
					<CardText>
						{format(new Date(startDate), 'PPP')}
					</CardText>
				</CardBody>
			</Card>
		)
	} else {
		return null
	}
}
