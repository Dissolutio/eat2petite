import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const UserContestDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_POSTS}${id}`}>{`Contest ID: ${id}`}</Link>
}
export const UserPostDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
}
export const UserChallengeDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_CHALLENGES}${id}`}>{props.children}</Link>
}
export const ChallengeCardLink = ({ uid, children }) => <Link to={`${ROUTES.ADMIN_CHALLENGES}${uid}`}>{children}</Link>

export const AdminUserDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_USERS}${id}`}>{`User ID: ${id}`}</Link>
}

export const AdminPostDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
}
export const AdminContestDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_CONTESTS}${id}`}>{props.children}</Link>
}
