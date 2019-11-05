import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { meetAuthConditionOrRedirectHOC } from '../../components/authentication/meetAuthConditionOrRedirectHOC'

import LandingPage from './LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'
// import SignInForm_Dev from '../authentication/SignInForm_Dev'

import UserRouter from './UserRouter'
import AdminRouter from './AdminRouter'
import { useDataContext } from '../../contexts/useDataContext'
import Page404NotFound from './Page404NotFound'

import * as ROUTES from '../../routes'

export default function AppRouter(props) {
	const { authUser } = props
	const signedInCondition = () => !!authUser
	const notSignedInCondition = () => !authUser
	const emailNotVerifiedCondition = () => signedInCondition() && authUser.emailVerified === false
	const adminCondition = () => signedInCondition() && authUser.userRole === `admin`
	const { loadFirebaseData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser])
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
