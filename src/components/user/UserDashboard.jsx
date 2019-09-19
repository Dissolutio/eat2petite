import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'

import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'
import UserCreatePostForm from '../forms/UserCreatePostForm'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'

export default function UserDashboard() {
	const { appData } = useDataContext()
	const { user } = useAuthUserContext()
	const { challenges, posts, users } = appData
	const currentUser = users[user.uid]
	return (
		<div>
			<h1>User Dashboard</h1>
			<UserCreatePostForm />
			<UserPostsList posts={posts} currentUser={currentUser} />
			<UserChallengesList challenges={challenges} />
		</div>
	)
}
