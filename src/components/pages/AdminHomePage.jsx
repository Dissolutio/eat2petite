import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, meetAuthConditionOrRedirectHOC } from '../../firebase'
import { useDataContext } from '../../modules/hooks/useDataContext'

import UserDashboard from '../shared/UserDashboard'
import AccountPage from '../pages/AccountPage'
import UserChallengesList from '../shared/UserChallengesList'
import UserPostsList from '../shared/UserPostsList'
import UserPostDetailPage from '../pages/UserPostDetailPage'
import UserChallengeDetail from '../shared/UserChallengeDetail'

import * as ROUTES from '../../routes'

function filterAppDataUser(data) {
	return { ...data }
}

export default function AdminHomePage() {
	const { appData } = useDataContext()
	const userAppData = filterAppDataUser(appData)
	const { posts, sampleUsers, challenges, contests } = userAppData
	const { user } = useAuthUserContext()
	const emailVerifiedCondition = () => !!user && user.emailVerified === true
	const notAdminCondition = () => !!user && user.userRole !== `admin`

	return (
		<div>
			AdminHomePage
			<Switch>
				<Route exact path={ROUTES.USER_HOMEPAGE} component={UserDashboard} />
				<Route exact path={ROUTES.USER_POSTS} render={props => <UserPostsList posts={posts} />} />
				<Route path={`${ROUTES.USER_POSTS}:id`} component={UserPostDetailPage} />
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
			</Switch>
		</div>
	)
}
