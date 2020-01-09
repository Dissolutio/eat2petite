import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes'

export const AdminUserDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_USERS}${id}`}>{children}</Link>
)
export const AdminContestDetailLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.ADMIN_CONTESTS}${contestId}`}>{children}</Link>
)
export const AdminCreateContestLink = ({ children }) => (
  <Link to={`${ROUTES.ADMIN_CREATE_CONTEST}`}>{children}</Link>
)
