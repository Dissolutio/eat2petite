import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { meetAuthConditionOrRedirectHOC } from '../../components//authentication/meetAuthConditionOrRedirectHOC'
import { useDataContext } from '../../contexts/useDataContext'

import { UserDashboard } from '../user/UserDashboard/'
import AccountPage from '../user/AccountPage'
import UserChallengesList from '../user/UserChallengesList'
import UserPostsList from '../user/UserPostsList'
import UserPostDetail from '../user/UserPostDetail'
import ChallengeCard from '../shared/ChallengeCard'

import * as ROUTES from '../../routes'

export default function UserRouter(props) {
	const { loadFirebaseData, appData } = useDataContext()
	React.useEffect(() => {
		loadFirebaseData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const { posts, challenges, users } = appData
	const { user } = useAuthUserContext()
	const emailVerifiedCondition = () => !!user && user.emailVerified === true
	const notAdminCondition = () => !!user && user.userRole !== `admin`
	return (
		<Switch>
			<Route exact path={ROUTES.USER_POSTS} render={props => <UserPostsList posts={posts} />} />
			<Route
				path={`${ROUTES.USER_POSTS}:id`}
				render={props => {
					const postId = props.match.params.id
					const post = { ...posts[postId], uid: postId }
					return <UserPostCard currentUser={user} post={post} />
				}}
			/>
			<Route
				exact
				path={ROUTES.USER_CHALLENGES}
				render={props => <UserChallengesList challenges={challenges} />}
			/>
			<Route path={`${ROUTES.USER_CHALLENGES}:id`} render={props => <ChallengeCard challenge={challenges[props.match.params.id]} />} />
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
