import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useInputValue } from '../../modules/hooks/useInputValue'
import { useFirebaseContext } from '../../contexts/useFirebaseContext'

const SignUpForm = () => {
	const firebaseApp = useFirebaseContext()

	const username = useInputValue('dissolutio')
	const email = useInputValue('entity.john@gmail.com')
	const [userRole, setUserRole] = useState('default')
	const password = useInputValue('password')
	const passwordVerify = useInputValue('password')

	const onFormSubmit = event => {
		console.log('event.target: ', event.target)
		event.preventDefault()
		const user = { email: email.value, username: username.value, userRole }
		const userPassword = password.value
		firebaseApp.doCreateNewUser(user, userPassword)
	}

	const isInvalid =
		password.value !== passwordVerify.value || password.value === '' || email.value === '' || username.value === ''
	return (
		<div>
			<form onSubmit={onFormSubmit}>
				<fieldset>
					<legend>Register</legend>
					<div>
						<label htmlFor="username">
							Username:
							<input type="text" placeholder="Username" {...username} />
						</label>
					</div>
					<div>
						<label htmlFor="email">
							Email address:
							<input type="text" placeholder="Email" {...email} />
						</label>
					</div>

					<div>
						<label htmlFor="password">
							Password:
							<input type="password" placeholder="Password" {...password} />
						</label>
					</div>
					<div>
						<label htmlFor="passwordVerify">
							Confirm password:
							<input type="password" placeholder="Verify Password" {...passwordVerify} />
						</label>
					</div>
					<button type="submit" disabled={isInvalid}>
						Submit
					</button>
				</fieldset>
			</form>
		</div>
	)
}

export default withRouter(SignUpForm)
