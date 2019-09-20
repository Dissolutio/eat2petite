import React from 'react'

import { useDataContext } from '../../contexts/useDataContext'

import UserCreatePostForm from '../forms/UserCreatePostForm'
import UserContestsList from './UserContestsList'
import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'

export default function UserDashboard() {
	const { appData } = useDataContext()
	const { contests, challenges, posts } = appData
	return (
		<div>
			<h1>User Dashboard</h1>
			<UserContestsList contests={contests} />
			<UserCreatePostForm />
			<UserPostsList posts={posts} />
			<UserChallengesList challenges={challenges} />
		</div>
	)
}
