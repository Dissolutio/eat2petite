import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import ChallengesList from '../shared/ChallengesList'
import AdminContestsList from './AdminContestsList'

export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	return (
		<div>
			<h1>Admin Dashboard</h1>
			<AdminContestsList contests={contests} />
			<ChallengesList challenges={challenges} />
		</div>
	)
}
