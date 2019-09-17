import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

import AdminChallengesList from './AdminChallengesList'
import AdminContestsList from './AdminContestsList'

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	return (
		<div>
			<h1>Admin Dashboard</h1>
			<AdminContestsList contests={contests} />
			<AdminChallengesList challenges={challenges} />
		</div>
	)
}
