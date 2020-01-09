import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute, EmailVerifiedRoute, AdminRoute, RegistrationRoute } from 'components/navigation/AuthRoutes'

import LandingPage from '../layout/LandingPage'
import VerifyEmail from '../authentication/VerifyEmail'
import RegisterForm from '../authentication/RegisterForm'
import LoginForm from '../authentication/LoginForm'

import { useDataContext } from '../../contexts/useDataContext'

import UserDashboard from '../user/UserDashboard'
import AccountPage from '../user/AccountPage'

import AdminDashboard from '../admin/AdminDashboard'
import AdminContestsPage from '../admin/AdminContestsPage'
import AdminContestDetail from '../admin/AdminContestDetail'
import AdminUsersList from '../admin/AdminUsersList'
import AdminUserDetail from '../admin/AdminUserDetail'
import CreateContestForm from '../admin/CreateContestForm'

import { ChallengesPage } from '../shared/Challenges'
import Page404NotFound from '../layout/Page404NotFound'

import * as ROUTES from '../../routes'

export default function AppRouter({ user }) {
  const { loadFirebaseData, appData } = useDataContext()
  React.useEffect(() => {
    loadFirebaseData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const { challenges, posts, users, contests } = appData
  return (
    <Switch>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route
        exact
        path={ROUTES.VERIFY_EMAIL}
        component={VerifyEmail}
      />
      <RegistrationRoute
        exact
        path={ROUTES.REGISTER}
        component={RegisterForm}
      />
      <RegistrationRoute
        exact
        path={ROUTES.LOGIN}
        component={LoginForm}
      />
      <EmailVerifiedRoute
        exact
        path={ROUTES.ACCOUNT}
        component={AccountPage}
      />
      <PrivateRoute
        exact
        path={ROUTES.USER_DASHBOARD}
        component={UserDashboard}
      />
      <PrivateRoute
        exact
        path={ROUTES.USER_CHALLENGES}
        component={ChallengesPage}
      />
      <AdminRoute
        exact
        path={ROUTES.ADMIN_DASHBOARD}
        render={(props) => (
          <AdminDashboard
            contests={contests}
            users={users}
            posts={posts}
            challenges={challenges}
            {...props}
          />
        )}
      />
      <AdminRoute
        exact
        path={ROUTES.ADMIN_CONTESTS}
        render={() => (
          <AdminContestsPage
            users={users}
            challenges={challenges}
            contests={contests}
          />
        )}
      />
      <AdminRoute
        exact
        path={ROUTES.ADMIN_CREATE_CONTEST}
        render={() => (
          <CreateContestForm users={users} challenges={challenges} />
        )}
      />
      <AdminRoute
        path={`${ROUTES.ADMIN_CONTESTS}/:id`}
        render={(props) => (
          <AdminContestDetail
            contests={contests}
            users={users}
            challenges={challenges}
            {...props}
          />
        )}
      />
      <AdminRoute
        exact
        path={ROUTES.ADMIN_CHALLENGES}
        render={(props) => (
          <ChallengesPage isAdmin={true} challenges={challenges} />
        )}
      />
      <AdminRoute
        exact
        path={ROUTES.ADMIN_USERS}
        render={() => <AdminUsersList users={users} />}
      />
      <AdminRoute
        path={`${ROUTES.ADMIN_USERS}/:id`}
        render={(props) => (
          <AdminUserDetail
            users={users}
            challenges={challenges}
            contests={contests}
          />
        )}
      />
      <Route component={Page404NotFound} />
    </Switch>
  )
}
