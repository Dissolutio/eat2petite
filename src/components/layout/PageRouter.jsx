import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, meetAuthConditionOrRedirectHOC } from '../../firebase'

import LandingPage from '../pages/LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'

import UserHomePage from '../pages/UserHomePage'
import AdminHomePage from '../pages/AdminHomePage'

import Page404NotFound from '../pages/Page404NotFound'

import * as ROUTES from '../../routes'

export default function PageRouter() {
	const { user } = useAuthUserContext()
	const signedInCondition = () => !!user
	const notSignedInCondition = () => !user
	const signedInAndEmailVerifiedCondition = () => signedInCondition() && user.emailVerified === true
	const emailNotVerifiedCondition = () => signedInCondition() && user.emailVerified === false
	const adminCondition = () => signedInCondition() && user.userRole === `admin`

	return (
		<Switch>
			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route
				exact
				path={ROUTES.REGISTER}
				component={meetAuthConditionOrRedirectHOC(notSignedInCondition, ROUTES.USER_HOMEPAGE)(SignUpForm)}
			/>
			<Route
				exact
				path={ROUTES.LOGIN}
				component={meetAuthConditionOrRedirectHOC(notSignedInCondition, ROUTES.USER_HOMEPAGE)(SignInForm)}
			/>
			<Route
				exact
				path={ROUTES.VERIFY_EMAIL}
				component={meetAuthConditionOrRedirectHOC(emailNotVerifiedCondition, ROUTES.LOGIN)(VerifyEmail)}
			/>
			<Route
				path={ROUTES.USER_HOMEPAGE}
				component={meetAuthConditionOrRedirectHOC(signedInCondition, ROUTES.LOGIN)(UserHomePage)}
			/>
			<Route
				path={ROUTES.ADMIN_DASHBOARD}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminHomePage)}
			/>
			<Route component={Page404NotFound} />
		</Switch>
	)
}
