import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from 'routes.js'

const AdminUserDetailLink = ({ id, children }) => (
  <Link to={`${ROUTES.ADMIN_USERS}/${id}`}>{children}</Link>
)
const AdminContestDetailLink = ({ contestId, children }) => (
  <Link to={`${ROUTES.ADMIN_CONTESTS}/${contestId}`}>{children}</Link>
)
const AdminCreateContestLink = ({ children }) => (
  <Link to={`${ROUTES.ADMIN_CREATE_CONTEST}`}>{children}</Link>
)
export {
  AdminUserDetailLink,
  AdminContestDetailLink,
  AdminCreateContestLink
}