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
							<ListGroupItemText>
								{`${user.username || (user.firstName + ' ' + user.lastName)}`}
							</ListGroupItemText>
							<ListGroupItemText>
								{`${user.email}`}
							</ListGroupItemText>
							<ListGroupItemText>
								{`${user.userHeightFeet || '?'}' ${user.userHeightInches || '?'}"`}
							</ListGroupItemText>
							<ListGroupItemText>
								{`${user.userWeight || '?'} lbs`}
							</ListGroupItemText>
						</ListGroupItem>
					)
				})
				}
			</ListGroup>
		</Container>
	)
}
