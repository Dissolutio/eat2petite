import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { meetAuthConditionOrRedirectHOC } from '../../components/authentication/meetAuthConditionOrRedirectHOC'

import LandingPage from './LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'

import { useDataContext } from '../../contexts/useDataContext'

import UserDashboard from '../user/UserDashboard'
import AccountPage from '../user/AccountPage'

import AdminDashboard from '../admin/AdminDashboard'
import AdminContestsPage from '../admin/AdminContestsList'
import AdminContestDetail from '../admin/AdminContestDetail'
import AdminUsersList from '../admin/AdminUsersList'
import AdminUserDetail from '../admin/AdminUserDetail'

import { ChallengesPage } from '../shared/Challenges'
import Page404NotFound from './Page404NotFound'

import * as ROUTES from '../../routes'

export default function AppRouter(props) {
	const { authUser } = props
	const signedInCondition = () => !!authUser
	const notSignedInCondition = () => !authUser
	const emailVerifiedCondition = () => !!me && me.emailVerified === true
	const emailNotVerifiedCondition = () => signedInCondition() && authUser.emailVerified === false
	const notAdminCondition = () => !!me && me.userRole !== `admin`
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser])
	const { challenges, me, posts, users, contests } = appData
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
				exact
				path={ROUTES.USER_CHALLENGES}
				render={() => <ChallengesPage challenges={challenges} />}
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
			<Route exact path={ROUTES.ADMIN_DASHBOARD} render={props => (
				<AdminDashboard
					contests={contests}
					users={users}
					posts={posts}
					challenges={challenges}
					{...props}
				/>)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CONTESTS}
				render={() => (
					<AdminContestsPage users={users} challenges={challenges} contests={contests} />
				)}
			/>
			<Route
				path={`${ROUTES.ADMIN_CONTESTS}:id`}
				render={props => (
					<AdminContestDetail
						contests={contests}
						users={users}
						challenges={challenges}
						{...props}
					/>
				)}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_CHALLENGES}
				render={props => <ChallengesPage challenges={challenges} />}
			/>
			<Route
				exact
				path={ROUTES.ADMIN_USERS}
				render={props => <AdminUsersList users={users} />}
			/>
			<Route
				path={`${ROUTES.ADMIN_USERS}:id`}
				render={props => (
					<AdminUserDetail users={users} challenges={challenges} contests={contests} />
				)}
			/>
			<Route component={Page404NotFound} />
		</Switch>
	)
}
