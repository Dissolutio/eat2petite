import React from 'react'
import { Container } from 'reactstrap'
import { withRouter } from 'react-router-dom'

function AdminUserDetail(props) {
	const { users } = props
	const { id } = props.match.params
	const user = users && users[id]

	return (
		(user && (
			<Container key={user.uid}>
				<ul>
					<li>{`username: ${user.username}`}</li>
					<li>{`email: ${user.email}`}</li>
					<li>{`userRole: ${user.userRole}`}</li>
				</ul>
			</Container>
		)) || <div>No User Found</div>
	)
}

export default withRouter(AdminUserDetail)
