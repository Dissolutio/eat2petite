import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { meetAuthConditionOrRedirectHOC } from '../../components//authentication/meetAuthConditionOrRedirectHOC'
import { useDataContext } from '../../contexts/useDataContext'

import UserDashboard from '../user/UserDashboard'
import AccountPage from '../user/AccountPage'
import ChallengesList from '../shared/ChallengesList'

import * as ROUTES from '../../routes'

export default function UserRouter() {
	const { appData } = useDataContext()
	const { challenges, me } = appData
	const emailVerifiedCondition = () => !!me && me.emailVerified === true
	const notAdminCondition = () => !!me && me.userRole !== `admin`
	return (
		<Switch>
			<Route
				exact
				path={ROUTES.USER_CHALLENGES}
				render={props => <ChallengesList challenges={challenges} />}
			/>
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
