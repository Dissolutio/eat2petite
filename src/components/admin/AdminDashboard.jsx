import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'
import { Container } from 'reactstrap'
import AdminChallengesList from './AdminChallengesList'
import AdminContestsList from './AdminContestsList'
import AdminUsersList from './AdminUsersList'
import DevConsole from '../shared/DevConsole'
import CreateContestForm from './CreateContestForm'
import { AdminContestDetailLink } from '../navigation/Links'

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	console.log(process.env)
	return (
		<Container>
			<h2>Admin Dashboard</h2>
			{contests && (
				<ul>
					{Object.keys(contests).map(contestKey => {
						const contest = contests[contestKey]
						const id = contest.uid
						return (
							<li key={id}>
								<AdminContestDetailLink id={id}>{contest.title}</AdminContestDetailLink>
							</li>
						)
					})}
				</ul>
			)}
			<AdminContestsList contests={contests} />
			<AdminUsersList users={users}></AdminUsersList>
			{((process.env.NODE_ENV === 'development') && (<DevConsole />))}
		</Container>
	)
}
