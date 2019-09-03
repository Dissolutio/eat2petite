import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, meetAuthConditionOrRedirectHOC } from '../../firebase'

import LandingPage from '../pages/LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'

import UserHomePage from '../pages/UserHomePage'
import AdminHomePage from '../pages/AdminHomePage'

import AdminDashboard from '../pages/AdminDashboard'
import AdminContestsListPage from '../shared/AdminContestsListPage'
import AdminContestDetailPage from '../shared/AdminContestDetailPage'
import AdminUsersListPage from '../pages/AdminUsersListPage'
import AdminUserDetailPage from '../pages/AdminUserDetailPage'
import AdminChallengesListPage from '../shared/AdminChallengesListPage'
import AdminChallengeDetailPage from '../shared/AdminChallengeDetailPage'
import AdminPostsListPage from '../pages/AdminPostsListPage'
import AdminPostDetailPage from '../pages/AdminPostDetailPage'

import Page404NotFound from '../pages/Page404NotFound'

import * as ROUTES from '../../routes'

export default function PageRouter() {
	const { user } = useAuthUserContext()
	const signedInCondition = () => !!user
	const notSignedInCondition = () => !user
	const emailNotVerifiedCondition = () => !!user && user.emailVerified === false
	const emailVerifiedCondition = () => !!user && user.emailVerified === true
	const adminCondition = () => !!user && user.userRole === `admin`
	const notAdminCondition = () => !!user && user.userRole !== `admin`

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
				exact
				path={ROUTES.ADMIN_DASHBOARD}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminDashboard)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CONTESTS_LIST}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminContestsListPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CONTEST_DETAIL}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminContestDetailPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_USERS_LIST}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminUsersListPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_USER_DETAIL}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminUserDetailPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CHALLENGES_LIST}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(
					AdminChallengesListPage,
				)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CHALLENGE_DETAIL}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(
					AdminChallengeDetailPage,
				)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_POSTS_LIST}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminPostsListPage)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_POST_DETAIL}
				component={meetAuthConditionOrRedirectHOC(adminCondition, ROUTES.USER_HOMEPAGE)(AdminPostDetailPage)}
			/>
			<Route component={Page404NotFound} />
		</Switch>
	)
}
