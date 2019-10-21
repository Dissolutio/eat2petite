import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const UserPostDetailLink = ({ id }) => (
  <Link to={`${ROUTES.USER_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
)

export const UserChallengeDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.USER_CHALLENGES}${id}`}>{children}</Link>
)

export const AdminChallengeDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_CHALLENGES}${id}`}>{children}</Link>
)

export const AdminUserDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_USERS}${id}`}>{children}</Link>
)

export const AdminPostDetailLink = ({ id }) => (
  <Link to={`${ROUTES.ADMIN_POSTS}${id}`}>{`Post ID: ${id}`}</Link>
)

export const AdminContestDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_CONTESTS}${id}`}>{children}</Link>
)
