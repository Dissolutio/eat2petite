import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import AdminChallengesList from './AdminChallengesList'
import AdminContestsList from './AdminContestsList'
import DevConsole from '../shared/DevConsole'
export default function AdminDashboard() {
	const { appData } = useDataContext()
	const { users, posts, challenges, contests } = appData
	return (
		<div>
			<h2>Admin Dashboard</h2>
			<AdminChallengesList challenges={challenges} />
			<AdminContestsList contests={contests} />
		</div>
	)
}
