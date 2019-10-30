import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { AdminContestDetailLink } from '../layout/Links'
export default function AdminContestsList(props) {
	const { contests } = props

	return contests ? (
		<ListGroup>
			<h3>Contests:</h3>
			{contests && Object.keys(contests).map(contestKey => {
				const contest = contests[contestKey]
				const id = contest.uid
				return (
					<ListGroupItem key={contestKey}>
						<AdminContestDetailLink id={id}>{contest.title}</AdminContestDetailLink>
					</ListGroupItem>
				)
			})}
		</ListGroup>
	) : (<p>No Contests Found</p>)
}
