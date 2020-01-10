import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute, EmailVerifiedRoute, AdminRoute, RegistrationRoute } from 'components/navigation/AuthRoutes'
import LandingPage from 'components/layout/LandingPage'
import VerifyEmail from 'components/authentication/VerifyEmail'
import RegisterForm from 'components/authentication/RegisterForm'
import LoginForm from 'components/authentication/LoginForm'
import UserDashboard from 'components/user/UserDashboard'
import AdminDashboard from 'components/admin/AdminDashboard'
import AdminContestsPage from 'components/admin/AdminContestsPage'
import CreateContestForm from 'components/admin/CreateContestForm'
import AdminContestDetail from 'components/admin/AdminContestDetail'
import AdminUsersPage from 'components/admin/AdminUsersPage'
import AdminUserDetail from 'components/admin/AdminUserDetail'
import { ChallengesPage } from 'components/shared/Challenges'
import AccountPage from 'components/layout/AccountPage'
import Page404NotFound from 'components/layout/Page404NotFound'

import * as ROUTES from 'routes.js'

export default function AppRouter() {
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
      <AdminRoute exact path={ROUTES.ADMIN_CREATE_CONTEST} component={CreateContestForm} />
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
