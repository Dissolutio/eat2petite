import React from 'react'
import { Container } from 'reactstrap'
import { AdminUserDetailLink } from '../navigation/Links'

export default function AdminUsersList(props) {
	const { users } = props
	return (
		(users && (
			<Container>
				<h2>Admin Users List</h2>
				{Object.keys(users).map(userKey => {
					const user = users[userKey]
					return (
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
					)
				})}
			</Container>
		)) || <Container>No Users Found</Container>
	)
}
