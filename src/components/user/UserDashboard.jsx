import React from 'react'

import { useDataContext } from '../../contexts/useDataContext'

import WaterChallengePostForm from '../forms/WaterChallengePostForm'
import UserContestsList from './UserContestsList'
import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'

export default function UserDashboard() {
	const { appData } = useDataContext()
	const { contests, challenges, posts } = appData
	return (
		<div>
			<h1 className="text-center">User Dashboard</h1>
			<hr />
			<UserContestsList contests={contests} />
			<WaterChallengePostForm />
			<UserPostsList posts={posts} />
			<UserChallengesList challenges={challenges} />
		</div>
	)
}
