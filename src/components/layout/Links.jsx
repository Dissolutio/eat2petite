import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const UserContestDashboardLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.USER_HOMEPAGE}?selectedContest=${contestId}`}>{children}</Link>
)
export const AdminUserDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_USERS}${id}`}>{children}</Link>
)
export const AdminContestDetailLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.ADMIN_CONTESTS}${contestId}`}>{children}</Link>
)
export const AdminContestDashboardLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.ADMIN_DASHBOARD}?selectedContest=${contestId}`}>{children}</Link>
)
