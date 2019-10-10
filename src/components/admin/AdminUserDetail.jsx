import React from 'react'
import { Container, ListGroup, ListGroupItem, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { useDataContext } from '../../contexts/useDataContext'
import UserChallengeTargetsForm from './UserChallengeTargetsForm'
function AdminUserDetail(props) {
	const { appData } = useDataContext()
	const { users } = appData
	const { id } = props.match.params
	const user = users && users[id]
	return (
		(user && (
			<Container key={user.uid}>
				<h3>{`${user.firstName} ${user.lastName}`}</h3>
				<ListGroup>
					<ListGroupItem>{`Username: ${user.username}`}</ListGroupItem>
					<ListGroupItem>{`Email: ${user.email}`}</ListGroupItem>
					<ListGroupItem>{`Weight: ${user.userWeight} lbs`}</ListGroupItem>
					<ListGroupItem>{`Height: ${user.userHeightFeet}' ${user.userHeightInches}"`}</ListGroupItem>
					<UserChallengeTargetsForm user={user} />
				</ListGroup>
			</Container>
		)) || <Container>No User Found</Container>
	)
}

export default withRouter(AdminUserDetail)
