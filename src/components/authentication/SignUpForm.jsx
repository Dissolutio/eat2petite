import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'

const SignUpForm = () => {
	const firebaseApp = useFirebaseContext()
	const username = useInputValue('')
	const email = useInputValue('')
	const password = useInputValue('')
	const passwordVerify = useInputValue('')
	const [formError, setFormError] = useState({ code: '', message: '' })
	const onFormSubmit = event => {
		event.preventDefault()
		const user = { email: email.value, username: username.value, userRole: 'default' }
		const userPassword = password.value
		firebaseApp.doCreateNewUser(user, userPassword)
	}

	const isInvalid =
		password.value !== passwordVerify.value || password.value === '' || email.value === '' || username.value === ''
	return (
		<Container>
			<Form className="p-2 border border-success rounded text-center" onSubmit={onFormSubmit}>
				<h2>Sign Up</h2>
				{formError && formError.message ? <Alert color="danger">{formError.message}</Alert> : null}
				<FormGroup>
					<Label htmlFor="username">
						Username:
						<Input type="text" placeholder="Username" {...username} />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">
						Email address:
						<Input type="text" placeholder="Email" {...email} />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">
						Password:
						<Input type="password" placeholder="Password" {...password} />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="passwordVerify">
						Confirm password:
						<Input type="password" placeholder="Verify Password" {...passwordVerify} />
					</Label>
				</FormGroup>
				<Button type="submit" disabled={isInvalid}>
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default withRouter(SignUpForm)
