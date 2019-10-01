import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { meetAuthConditionOrRedirectHOC } from '../../components/authentication/meetAuthConditionOrRedirectHOC'

import LandingPage from '../pages/LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'
// import SignInForm_Dev from '../authentication/SignInForm_Dev'

import UserRouter from './UserRouter'
import AdminRouter from './AdminRouter'

import Page404NotFound from '../pages/Page404NotFound'

import * as ROUTES from '../../routes'

export default function AppRouter() {
	const { user } = useAuthUserContext()
	const signedInCondition = () => !!user
	const notSignedInCondition = () => !user
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
				component={meetAuthConditionOrRedirectHOC(signedInCondition, ROUTES.LOGIN)(UserRouter)}
			/>
			<Route
				path={ROUTES.ADMIN_DASHBOARD}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminRouter)}
			/>
			<Route component={Page404NotFound} />
		</Switch>
	)
}
