import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthUserContext } from '../../firebase'
import * as ROUTES from '../../routes'

const NavLinks = props => {
	const { user } = useAuthUserContext()
	const { closeSidebarMenu } = props

	const notSignedInCondition = !user
	const signedInCondition = user
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
			<NavBarLink to={ROUTES.LANDING}>Landing</NavBarLink>
			<NavBarLink to={ROUTES.USER_HOMEPAGE}>User Dashboard</NavBarLink>
			<NavBarLink to={ROUTES.USER_ACCOUNT}>Account</NavBarLink>
		</>
	)
	const AdminLinks = () => (
		<>
			<NavBarLink to={ROUTES.ADMIN_DASHBOARD}>Dashboard</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_CONTESTS_LIST}>Contests</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_CHALLENGES_LIST}>Challenges</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_USERS_LIST}>Users</NavBarLink>
			<NavBarLink to={ROUTES.ADMIN_POSTS_LIST}>Posts</NavBarLink>
		</>
	)
	const NavBarLink = ({ children, to }) => {
		return (
			<Link onClick={closeSidebarMenu} to={to}>
				{children}
			</Link>
		)
	}
	return (
		<nav>
			{notSignedInCondition ? <NonAuthLinks /> : null}
			{signedInCondition ? <AuthLinks /> : null}
			{adminCondition ? <AdminLinks /> : null}
		</nav>
	)
}
export default NavLinks
