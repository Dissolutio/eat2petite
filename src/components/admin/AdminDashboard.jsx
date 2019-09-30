import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import AdminChallengesList from './AdminChallengesList'
import AdminContestsList from './AdminContestsList'
import AdminUsersList from './AdminUsersList'
import DevConsole from '../shared/DevConsole'
import ContestCreateForm from '../forms/ContestCreateForm'
import { AdminContestDetailLink } from '../navigation/Links'

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	return (
		<div>
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
			<AdminChallengesList challenges={challenges} />
			<AdminUsersList users={users}></AdminUsersList>
			{((process.env.NODE_ENV === 'development') && (<DevConsole />))}
		</div>
	)
}
