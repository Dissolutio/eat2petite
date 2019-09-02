import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, meetAuthConditionOrRedirectHOC } from '../../firebase'

import LandingPage from '../pages/LandingPage'
import UserHomePage from '../pages/UserHomePage'
import ChallengesPage from '../pages/ChallengesPage'
import AccountPage from '../pages/AccountPage'
import AdminPage from '../pages/AdminPage'
import AdminUserListPage from '../pages/AdminUserListPage'
import Page404NotFound from '../pages/Page404NotFound'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'
import * as ROUTES from '../../routes'

export default function PageRouter() {
	const { user } = useAuthUserContext()
	const signedInCondition = () => !!user
	const notSignedInCondition = () => !user
	const emailNotVerifiedCondition = () => !!user && user.emailVerified === false
	const emailVerifiedCondition = () => !!user && user.emailVerified === true
	const adminCondition = () => !!user && user.userRole === `admin`

	return (
		<Switch>
			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route
				exact
				path={ROUTES.REGISTER}
				component={meetAuthConditionOrRedirectHOC(notSignedInCondition, ROUTES.USER_HOME)(SignUpForm)}
			/>
			<Route
				exact
				path={ROUTES.LOGIN}
				component={meetAuthConditionOrRedirectHOC(notSignedInCondition, ROUTES.USER_HOME)(SignInForm)}
			/>
			<Route
				exact
				path={ROUTES.USER_HOME}
				component={meetAuthConditionOrRedirectHOC(signedInCondition, ROUTES.LOGIN)(UserHomePage)}
			/>
			<Route
				exact
				path={ROUTES.VERIFY_EMAIL}
				component={meetAuthConditionOrRedirectHOC(emailNotVerifiedCondition, ROUTES.LOGIN)(VerifyEmail)}
			/>
			<Route
				exact
				path={ROUTES.USER_ACCOUNT}
				component={meetAuthConditionOrRedirectHOC(emailVerifiedCondition, ROUTES.VERIFY_EMAIL)(AccountPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOME)(AdminPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_USER_LIST}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOME)(AdminUserListPage)}
			/>
			<Route component={Page404NotFound} />
		</Switch>
	)
}
