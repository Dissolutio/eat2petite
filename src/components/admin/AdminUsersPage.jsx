import React from 'react'
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { AdminUserDetailLink } from '../navigation/Links'
import { useRealtimeDataContext } from 'contexts/useRealtimeDataContext'

export default function AdminUsersPage() {
	const { appData } = useRealtimeDataContext()
	const { adminUsers } = appData
	return (
		<Container>
			<h2>Admin Users List</h2>
			<AdminUsersList adminUsers={adminUsers} />
		</Container>
	)
}

function AdminUsersList({ adminUsers }) {
	if (!adminUsers) {
		return (<p>No users to show!</p>)
	}
	return (
		<ListGroup>
			{Object.values(adminUsers).map(user => {
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
	)
}
