import React from 'react'
import { NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { useUIContext } from '../../contexts/useUIContext'

import CurrentUserReadout from '../authentication/CurrentUserReadout'

import * as ROUTES from '../../routes'

const NavLinks = props => {
	const { user } = useAuthUserContext()

	const notSignedInCondition = !user
	const signedInNonAdminCondition = !!user && user.userRole === `default`
	const adminCondition = user && user.userRole === `admin`

	const NonAuthLinks = () => (
		<>
			<NavBarLink to={ROUTES.LANDING}>Home</NavBarLink>
			<NavBarLink to={ROUTES.REGISTER}>Sign Up</NavBarLink>
			<NavBarLink to={ROUTES.LOGIN}>Sign In</NavBarLink>
		</>
	)
	const AuthLinks = () => (
		<>
			<NavBarLink to={ROUTES.USER_HOMEPAGE}>Home</NavBarLink>
			<NavBarLink to={ROUTES.USER_POSTS}>Posts</NavBarLink>
			<NavBarLink to={ROUTES.USER_CHALLENGES}>Challenges</NavBarLink>
			<NavBarLink to={ROUTES.USER_ACCOUNT}>Account</NavBarLink>
		</>
	)
	const AdminLinks = () => (
		<>
			<NavBarLink to={ROUTES.ADMIN_DASHBOARD}>Dashboard</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_CONTESTS}>Contests</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_CHALLENGES}>Challenges</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_USERS}>Users</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_POSTS}>Posts</NavBarLink>
		</>
	)
	const NavBarLink = ({ children, to }) => {
		const { setMenuClose } = useUIContext()
		return (
			<NavItem>
				<Link onClick={setMenuClose} to={to} style={{ color: 'var(--E2P-orange' }}>
					{children}
				</Link>
			</NavItem>
		)
	}
	return (
		<nav>
			{notSignedInCondition ? <NonAuthLinks /> : null}
			{signedInNonAdminCondition ? <AuthLinks /> : null}
			{adminCondition ? <AdminLinks /> : null}
			<CurrentUserReadout />
		</nav>
	)
}
export default NavLinks
