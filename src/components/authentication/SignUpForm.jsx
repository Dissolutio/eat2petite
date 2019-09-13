import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useInputValue } from '../../modules/hooks/useInputValue'
import { useDataContext } from '../../modules/hooks/useDataContext'

const SignUpForm = () => {
	const { createFirebaseUser } = useDataContext()

	const username = useInputValue('dissolutio')
	const email = useInputValue('entity.john@gmail.com')
	const [userRole, setUserRole] = useState('default')
	const password = useInputValue('password')
	const passwordVerify = useInputValue('password')

	const onFormSubmit = event => {
		console.log('event.target: ', event.target)
		event.preventDefault()
		const user = { email: email.value, password: password.value, username: username.value, userRole }
		createFirebaseUser(user)
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
