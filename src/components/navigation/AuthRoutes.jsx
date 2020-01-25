
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../../contexts'
import * as ROUTES from '../../routes.js'

export const RegistrationRoute = ({ component: Component, restricted, ...rest }) => {
    // Reroutes to admin which has own redirect to user
    const { user } = useAuthContext()
    const isNotAlreadySignedIn = () => !user
    return (
        <Route {...rest} render={props => (
            isNotAlreadySignedIn() ?
                <Component {...props} />
                : <Redirect to={`${ROUTES.ADMIN_DASHBOARD}`} />
        )} />
    );
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuthContext()
    const isSignedIn = () => !!user
    return (
        <Route {...rest} render={props => (
            isSignedIn() ?
                <Component {...props} />
                : <Redirect to={`${ROUTES.LOGIN}`} />
        )} />
    );
};

export const EmailVerifiedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuthContext()
    const isVerified = () => !!user && !!user.emailVerified
    return (
        <Route {...rest} render={props => (
            isVerified() ?
                <Component {...props} />
                : <Redirect to={`${ROUTES.LOGIN}`} />
        )} />
    );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuthContext()
    const isAdmin = () => !!user && user.userRole === `admin`
    return (
        <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} />
                : <Redirect to={`${ROUTES.USER_DASHBOARD}`} />
        )} />
    );
};
