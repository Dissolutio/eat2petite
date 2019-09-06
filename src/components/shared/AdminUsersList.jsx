import React from 'react'
import { Link } from 'react-router-dom'

import { AdminUserDetailLink } from '../navigation/Links'

export default function AdminUsersList(props) {
	const { users } = props
	return (
		<ul>
			<h2>Sample Users List</h2>
			{users.map(user => (
				<li key={user.uid}>
					<ul>
						<li>{`username: ${user.username}`}</li>
						<li>
							<AdminUserDetailLink id={user.uid} />
						</li>
						<li>{`name: ${user.name}`}</li>
						<li>{`email: ${user.email}`}</li>
						<li>{`userRole: ${user.userRole}`}</li>
					</ul>
				</li>
			))}
		</ul>
	)
}
