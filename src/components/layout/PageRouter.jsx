import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useAuthUserContext, withAuthorizationHOC } from '../../firebase'

import LandingPage from '../pages/LandingPage'
import UserHomePage from '../pages/UserHomePage'
import AccountPage from '../pages/AccountPage'
import AdminPage from '../pages/AdminPage'
import AdminUserListPage from '../pages/AdminUserListPage'
import Page404NotFound from '../pages/Page404NotFound'
import VerifyEmail from '../authentication/VerifyEmail'
import SignUpForm from '../authentication/SignUpForm'
import SignInForm from '../authentication/SignInForm'
import * as ROUTES from '../../routes'

export default function PageRouter() {
    const { user } = useAuthUserContext()
    const notSignedInCondition = () => !user
    const signedInCondition = () => !!user
    const emailNotVerifiedCondition = () => !!user && user.emailVerified === false
    const emailVerifiedCondition = () => !!user && user.emailVerified === true
    const adminCondition = () => !!user && user.userRole === `admin`

    return (
        <Switch>
            <Route
                exact
                path={ROUTES.LANDING}
                component={withAuthorizationHOC(notSignedInCondition, ROUTES.USER_HOME)(LandingPage)}
            />
            <Route
                exact
                path={ROUTES.SIGNUP}
                component={withAuthorizationHOC(notSignedInCondition, ROUTES.USER_HOME)(SignUpForm)}
            />
            <Route
                exact
                path={ROUTES.SIGNIN}
                component={withAuthorizationHOC(notSignedInCondition, ROUTES.USER_HOME)(SignInForm)}
            />
            <Route
                exact
                path={ROUTES.VERIFY_EMAIL}
                component={withAuthorizationHOC(emailNotVerifiedCondition, ROUTES.SIGNIN)(VerifyEmail)}
            />
            <Route
                exact
                path={ROUTES.USER_ACCOUNT}
                component={withAuthorizationHOC(emailVerifiedCondition, ROUTES.VERIFY_EMAIL)(AccountPage)}
            />
            <Route
                exact
                path={ROUTES.ADMIN}
                component={withAuthorizationHOC(adminCondition, ROUTES.USER_HOME)(AdminPage)}
            />
            <Route
                exact
                path={ROUTES.ADMIN_USER_LIST}
                component={withAuthorizationHOC(adminCondition, ROUTES.USER_HOME)(AdminUserListPage)}
            />
            <Route
                path={ROUTES.USER_HOME}
                component={withAuthorizationHOC(signedInCondition, ROUTES.SIGNIN)(UserHomePage)}
            />
            <Route component={Page404NotFound} />
        </Switch>
    )
}
