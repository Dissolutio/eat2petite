import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, CardHeader, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import { AdminContestDetailLink } from '../layout/Links'
export default function AdminContestsList(props) {
	const { contests } = props
	const contestsArray =
		contests &&
		Object.keys(contests).map(contestKey => {
			return contests[contestKey]
		})

	return contests ? (
		<ListGroup>
			<h3>Contests:</h3>
			{Object.keys(contests).map(contestKey => {
				const contest = contests[contestKey]
				const id = contest.uid
				return (
					<ListGroupItem key={id}>
						<AdminContestDetailLink id={id}>{contest.title}</AdminContestDetailLink>
					</ListGroupItem>
				)
			})}
		</ListGroup>
	) : (<p>No Contests Found</p>)
}
