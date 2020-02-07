import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthContext } from './contexts'

import {
	Header,
	PageStyle,
	AppStyle,
	PrivateRoute,
	EmailVerifiedRoute,
	AdminRoute,
	RegistrationRoute,
	LandingPage,
	VerifyEmail,
	RegisterForm,
	LoginForm,
	UserDashboard,
	AdminDashboard,
	AdminContestsPage,
	ContestCreateForm,
	AdminContestDetail,
	AdminUsersPage,
	AdminUserDetail,
	ChallengesPage,
	AccountPage,
	Page404NotFound,
} from 'components'

import * as ROUTES from 'routes.js'

export default function App() {
	const { initializing, user } = useAuthContext()
	return (
		<AppStyle>
			<Header user={user} />
			<PageStyle >
				{initializing ? <LandingPage /> : <AppRouter />}
			</PageStyle>
		</AppStyle>
	)
}

function AppRouter() {
	return (
		<Switch>
			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route exact path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />

			<RegistrationRoute exact path={ROUTES.REGISTER} component={RegisterForm} />
			<RegistrationRoute exact path={ROUTES.LOGIN} component={LoginForm} />

			<EmailVerifiedRoute exact path={ROUTES.ACCOUNT} component={AccountPage} />

			<PrivateRoute exact path={ROUTES.USER_DASHBOARD} component={UserDashboard} />
			<PrivateRoute exact path={ROUTES.USER_CHALLENGES} component={ChallengesPage} />

			<AdminRoute exact path={ROUTES.ADMIN_DASHBOARD} component={AdminDashboard} />
			<AdminRoute exact path={ROUTES.ADMIN_CREATE_CONTEST} component={ContestCreateForm} />
			<AdminRoute exact path={ROUTES.ADMIN_CHALLENGES} component={ChallengesPage} />
			<AdminRoute exact path={ROUTES.ADMIN_CONTESTS} component={AdminContestsPage} />
			<AdminRoute path={`${ROUTES.ADMIN_CONTESTS}/:id`} component={AdminContestDetail} />
			<AdminRoute exact path={ROUTES.ADMIN_USERS} component={AdminUsersPage} />
			<AdminRoute path={`${ROUTES.ADMIN_USERS}/:id`} component={AdminUserDetail} />
			{/* 404 matches all paths, must be last */}
			<Route component={Page404NotFound} />
		</Switch>
	)
}