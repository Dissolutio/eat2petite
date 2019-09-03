import React from 'react'
import { Link } from 'react-router-dom'

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
							<Link to={`/user/admin/users/${user.uid}`}>{`uid: ${user.uid}`}</Link>
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
