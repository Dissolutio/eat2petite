import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const UserPostDetailLink = ({ postId, children }) => (
  <Link to={`${ROUTES.USER_POSTS}${postId}`}>{children}</Link>
)

export const UserChallengeDetailLink = ({ challengeId, children }) => (
  <Link to={`${ROUTES.USER_CHALLENGES}${challengeId}`}>{children}</Link>
)
export const UserContestDashboardLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.USER_HOMEPAGE}?selectedContest=${contestId}`}>{children}</Link>
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
