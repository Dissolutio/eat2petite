import React from 'react'
import { useDataContext } from '../../modules/hooks/useDataContext'

// import UserPostsList from './UserPostsList'
import UserChallengesList from './UserChallengesList'
import UserCreatePostForm from '../forms/UserCreatePostForm'

function filterAppDataUser(data) {
	return { ...data }
}

export default function UserDashboard() {
	const { appData } = useDataContext()

	const userAppData = filterAppDataUser(appData)
	const { challenges } = userAppData

	return (
		<div>
			<h1>User Dashboard</h1>
			<UserCreatePostForm />
			<UserChallengesList challenges={challenges} />
		</div>
	)
}
