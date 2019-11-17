import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import CreateContestForm from './CreateContestForm'
import { AdminContestDetailLink } from '../layout/Links'

export default function AdminContestsPage({ contests, users, challenges }) {
	return (
		<>
			<AdminContestsList contests={contests} />
			<CreateContestForm users={users} challenges={challenges} />
		</>
	)
}
function AdminContestsList(props) {
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
