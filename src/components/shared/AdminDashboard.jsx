import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

import AdminChallengesList from './AdminChallengesList'

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	return (
		<div>
			<h1>Admin Dashboard</h1>
			<AdminChallengesList challenges={challenges} />
		</div>
	)
}
