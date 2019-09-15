import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, meetAuthConditionOrRedirectHOC } from '../../firebase'
import { useDataContext } from '../../modules/hooks/useDataContext'

import UserDashboard from '../shared/UserDashboard'
import AccountPage from '../pages/AccountPage'
import UserChallengesList from '../shared/UserChallengesList'
import UserPostsList from '../shared/UserPostsList'
import UserPostDetail from '../shared/UserPostDetail'
import UserChallengeDetail from '../shared/UserChallengeDetail'

import * as ROUTES from '../../routes'

export default function UserHomePage() {
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const { posts, users, challenges, contests } = appData
	const { user } = useAuthUserContext()

	const emailVerifiedCondition = () => !!user && user.emailVerified === true
	const notAdminCondition = () => !!user && user.userRole !== `admin`

	return (
		<Switch>
			<Route exact path={ROUTES.USER_POSTS} render={props => <UserPostsList posts={posts} />} />
			<Route path={`${ROUTES.USER_POSTS}:id`} component={UserPostDetail} />
			<Route
				exact
				path={ROUTES.USER_CHALLENGES}
				render={props => <UserChallengesList challenges={challenges} />}
			/>
			<Route path={`${ROUTES.USER_CHALLENGES}:id`} component={UserChallengeDetail} />
			<Route
				exact
				path={ROUTES.USER_ACCOUNT}
				component={meetAuthConditionOrRedirectHOC(emailVerifiedCondition, ROUTES.VERIFY_EMAIL)(AccountPage)}
			/>
			<Route
				exact
				path={ROUTES.USER_HOMEPAGE}
				component={meetAuthConditionOrRedirectHOC(notAdminCondition, ROUTES.ADMIN_DASHBOARD)(UserDashboard)}
			/>
		</Switch>
	)
}
