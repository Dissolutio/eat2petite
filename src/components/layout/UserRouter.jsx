import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { meetAuthConditionOrRedirectHOC } from '../../components//authentication/meetAuthConditionOrRedirectHOC'
import { useDataContext } from '../../contexts/useDataContext'

import { UserHomepage } from '../user/UserDashboard'
import AccountPage from '../user/AccountPage'
import UserChallengesList from '../user/UserChallengesList'
import ChallengeCard from '../shared/ChallengeCard'

import * as ROUTES from '../../routes'

export default function UserRouter() {
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const { challenges, me } = appData
	const emailVerifiedCondition = () => !!me && me.emailVerified === true
	const notAdminCondition = () => !!me && me.userRole !== `admin`
	return (
		<Switch>
			<Route
				exact
				path={ROUTES.USER_CHALLENGES}
				render={props => <UserChallengesList challenges={challenges} />}
			/>
			<Route path={`${ROUTES.USER_CHALLENGES}:id`}
				render={props => <ChallengeCard challenge={challenges[props.match.params.id]} />}
			/>
			<Route
				exact
				path={ROUTES.USER_ACCOUNT}
				component={meetAuthConditionOrRedirectHOC(emailVerifiedCondition, ROUTES.VERIFY_EMAIL)(AccountPage)}
			/>
			<Route
				exact
				path={ROUTES.USER_HOMEPAGE}
				component={meetAuthConditionOrRedirectHOC(notAdminCondition, ROUTES.ADMIN_DASHBOARD)(UserHomepage)}
			/>
		</Switch>
	)
}
