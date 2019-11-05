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
				const { uid, title } = contest
				return (
					<ListGroupItem key={contestKey}>
						<AdminContestDetailLink contestId={uid}>{title}</AdminContestDetailLink>
					</ListGroupItem>
				)
			})}
		</ListGroup>
	) : (<p>No Contests Found</p>)
}
