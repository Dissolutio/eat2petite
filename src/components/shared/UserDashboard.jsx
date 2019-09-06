import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'

function filterAppDataUser(data) {
	return { ...data }
}

export default function UserDashboard() {
	const { appData } = useDataContext()
	const userAppData = filterAppDataUser(appData)
	const { posts, sampleUsers, challenges, contests } = userAppData
	return (
		<div>
			<h1>User Dashboard</h1>
			<UserChallengesList challenges={challenges} />
			<UserPostsList posts={posts} />
		</div>
	)
}
