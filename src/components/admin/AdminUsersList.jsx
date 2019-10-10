import React from 'react'
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { AdminUserDetailLink } from '../layout/Links'

export default function AdminUsersList(props) {
	const { users } = props
	return (
		<Container>
			<h2>Admin Users List</h2>
			<ListGroup>
				{users && Object.keys(users).map(userKey => {
					const user = users[userKey]
					return (
						<ListGroupItem key={user.uid}>
							<ListGroupItemHeading>
								<AdminUserDetailLink id={user.uid}>
									{`${user.firstName || ''} ${user.lastName || user.username}`}
								</AdminUserDetailLink>
							</ListGroupItemHeading>
							<ListGroupItemText className='text-secondary'>
								<small>
									{`${user.username || (user.firstName + ' ' + user.lastName)}`}
								</small>
							</ListGroupItemText>
							{user.userRole === 'admin' ?
								<ListGroupItemText className='text-info'>
									<small>
										Administrator
								</small>
								</ListGroupItemText>
								: null}
						</ListGroupItem>
					)
				})
				}
			</ListGroup>
		</Container>
	)
}
