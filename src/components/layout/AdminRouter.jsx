import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useDataContext } from '../../contexts/useDataContext'

import AdminDashboard from '../admin/AdminDashboard'
import AdminContestsList from '../admin/AdminContestsList'
import AdminContestDetail from '../admin/AdminContestDetail'
import AdminUsersList from '../admin/AdminUsersList'
import AdminUserDetail from '../admin/AdminUserDetail'
import { ChallengesPage } from '../shared/Challenges'
import AdminPostsList from '../admin/AdminPostsList'
import AdminPostDetail from '../admin/AdminPostDetail'
import CreateContestForm from '../admin/CreateContestForm'

import * as ROUTES from '../../routes'

export default function AdminRouter(props) {
	const { appData } = useDataContext()
	const { posts, users, challenges, contests } = appData

	return (
		<div>
			<Switch>
				<Route exact path={ROUTES.ADMIN_DASHBOARD} render={props => (
					<AdminDashboard
						contests={contests}
						users={users}
						posts={posts}
						challenges={challenges}
						{...props}
					/>
				)}
				/>
				<Route
					exact
					path={ROUTES.ADMIN_CONTESTS}
					render={props => (
						<>
							<AdminContestsList contests={contests} />
							<CreateContestForm users={users} challenges={challenges} />
						</>
					)}
				/>
				<Route path={`${ROUTES.ADMIN_CONTESTS}:id`} render={props => (
					<AdminContestDetail
						contests={contests}
						users={users}
						challenges={challenges}
						{...props}
					/>

				)
				} />
				<Route exact path={ROUTES.ADMIN_POSTS} render={props => <AdminPostsList posts={posts} />} />
				<Route path={`${ROUTES.ADMIN_POSTS}:id`} component={AdminPostDetail} />
				<Route
					exact
					path={ROUTES.ADMIN_CHALLENGES}
					render={props => <ChallengesPage challenges={challenges} />}
				/>
				<Route exact path={ROUTES.ADMIN_USERS} render={props => <AdminUsersList users={users} />} />
				<Route path={`${ROUTES.ADMIN_USERS}:id`}
					render={props => <AdminUserDetail users={users} challenges={challenges} contests={contests} />}
				/>
			</Switch>
		</div>
	)
}
