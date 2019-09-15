import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext } from '../../firebase'
import { useDataContext } from '../../modules/hooks/useDataContext'

import AdminDashboard from '../shared/AdminDashboard'
import AdminContestsList from '../shared/AdminContestsList'
import AdminContestDetail from '../shared/AdminContestDetail'
import AdminUsersList from '../shared/AdminUsersList'
import AdminUserDetail from '../shared/AdminUserDetail'
import AdminChallengesList from '../shared/AdminChallengesList'
import AdminChallengeDetail from '../shared/AdminChallengeDetail'
import AdminPostsList from '../shared/AdminPostsList'
import AdminPostDetail from '../shared/AdminPostDetail'

import * as ROUTES from '../../routes'

function filterAppDataUser(data) {
	return { ...data }
}

export default function AdminHomePage() {
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const userAppData = filterAppDataUser(appData)
	const { posts, sampleUsers, challenges, contests } = userAppData

	return (
		<div>
			<Switch>
				<Route exact path={ROUTES.ADMIN_DASHBOARD} component={AdminDashboard} />
				<Route exact path={ROUTES.ADMIN_CONTESTS} render={props => <AdminContestsList contests={contests} />} />
				<Route path={`${ROUTES.ADMIN_CONTESTS}:id`} component={AdminContestDetail} />
				<Route exact path={ROUTES.ADMIN_POSTS} render={props => <AdminPostsList posts={posts} />} />
				<Route path={`${ROUTES.ADMIN_POSTS}:id`} component={AdminPostDetail} />
				<Route
					exact
					path={ROUTES.ADMIN_CHALLENGES}
					render={props => <AdminChallengesList challenges={challenges} />}
				/>
				<Route path={`${ROUTES.ADMIN_CHALLENGES}:id`} component={AdminChallengeDetail} />
				<Route exact path={ROUTES.ADMIN_USERS} render={props => <AdminUsersList users={sampleUsers} />} />
				<Route path={`${ROUTES.ADMIN_USERS}:id`} component={AdminUserDetail} />
			</Switch>
		</div>
	)
}
