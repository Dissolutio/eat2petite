import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const AdminContestDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_POSTS}${id}`}>{`Contest ID: ${id}`}</Link>
}
export const UserContestDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_POSTS}${id}`}>{`Contest ID: ${id}`}</Link>
}

export const AdminUserDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_USERS}${id}`}>{`User ID: ${id}`}</Link>
}

export const AdminPostDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.ADMIN_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
}
export const UserPostDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
}

export const AdminChallengeDetailLink = props => {
	const { id } = props
	return
}
export const ChallengeCardLink = ({ uid }) => <Link to={`${ROUTES.ADMIN_CHALLENGES}${uid}`}>View Details / Edit</Link>
export const UserChallengeDetailLink = props => {
	const { id } = props
	return <Link to={`${ROUTES.USER_CHALLENGES}${id}`}>{`Challenge ID: ${id}`}</Link>
}
