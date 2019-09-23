import React from 'react'

import { useDataContext } from '../../contexts/useDataContext'

import WaterChallengePostForm from '../forms/WaterChallengePostForm'
import UserContestsList from './UserContestsList'
import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'
import DevConsole from '../shared/DevConsole'

// 1. Categorize all the days
// 2. Find matching post for each day
/// 3. Display latest six days
// 4. Display quick post form for today
export default function UserDashboard() {
	const { appData } = useDataContext()
	const { contests, challenges, posts } = appData
	return (
		<div>
			<h1 className="text-center">User Dashboard</h1>
			<hr />
			<DevConsole></DevConsole>
			<UserContestsList contests={contests} />
			<UserPostsList posts={posts} />
			<UserChallengesList challenges={challenges} />
			<WaterChallengePostForm />
		</div>
	)
}
