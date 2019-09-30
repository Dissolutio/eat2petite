import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useDataContext } from '../../contexts/useDataContext'

import AdminDashboard from '../admin/AdminDashboard'
import AdminContestsList from '../admin/AdminContestsList'
import AdminContestDetail from '../admin/AdminContestDetail'
import AdminUsersList from '../admin/AdminUsersList'
import AdminUserDetail from '../admin/AdminUserDetail'
import AdminChallengesList from '../admin/AdminChallengesList'
import AdminPostsList from '../admin/AdminPostsList'
import AdminPostDetail from '../admin/AdminPostDetail'
import ChallengeForm from '../admin/ChallengeForm'
import CreateContestForm from '../admin/CreateContestForm'

import * as ROUTES from '../../routes'

function filterAppDataUser(data) {
	return { ...data }
}

export default function AdminRouter() {
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const userAppData = filterAppDataUser(appData)
	const { posts, users, challenges, contests } = userAppData

	return (
		<div>
			<Switch>
				<Route exact path={ROUTES.ADMIN_DASHBOARD} component={AdminDashboard} />
				<Route
					exact
					path={ROUTES.ADMIN_CONTESTS}
					render={props => (
						<>
							<AdminContestsList contests={contests} />
							<CreateContestForm />
						</>
					)}
				/>
				<Route path={`${ROUTES.ADMIN_CONTESTS}:id`} component={AdminContestDetail} />
				<Route exact path={ROUTES.ADMIN_POSTS} render={props => <AdminPostsList posts={posts} />} />
				<Route path={`${ROUTES.ADMIN_POSTS}:id`} component={AdminPostDetail} />
				<Route
					exact
					path={ROUTES.ADMIN_CHALLENGES}
					render={props => <AdminChallengesList challenges={challenges} />}
				/>
				<Route path={`${ROUTES.ADMIN_CHALLENGES}:id`} component={ChallengeForm} />
				<Route exact path={ROUTES.ADMIN_USERS} render={props => <AdminUsersList users={users} />} />
				<Route path={`${ROUTES.ADMIN_USERS}:id`} render={props => <AdminUserDetail users={users} />} />
			</Switch>
		</div>
	)
}
