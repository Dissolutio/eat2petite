import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseContext } from '../../firebase'
import PasswordForgetForm from './PasswordForgetForm'
import * as ROUTES from '../../routes'
import { useInputValue } from '../../modules/hooks/useInputValue'

import { sampleUsers } from '../../sampleData'

const SignInForm_Dev = props => {
	const email = useInputValue('')
	const password = useInputValue('')
	const firebaseApp = useFirebaseContext()
	const [error, setError] = React.useState({ code: '', message: '' })

	const DevSignInButtons = () => {
		const signInAsSampleUser = user => {
			const { email, password } = user
			firebaseApp.doSignInWithEmailAndPassword(email, password).catch(error => setError({ ...error }))
		}
		return (
			<div>
				{sampleUsers.map(sampleUser => {
					const { username, email } = sampleUser
					return (
						<button key={email} onClick={() => signInAsSampleUser(sampleUser)}>
							Sign in as {`${username}`}
						</button>
					)
				})}
			</div>
		)
	}

	const onFormSubmit = async event => {
		event.preventDefault()
		firebaseApp.doSignInWithEmailAndPassword(email.value, password.value).catch(error => setError({ ...error }))
	}
	const isInvalid = password.value === '' || email.value === ''
	return (
		<>
			<p>
				Don't have an account? <Link to={ROUTES.REGISTER}>Sign Up!</Link>
			</p>
			<form onSubmit={onFormSubmit}>
				<DevSignInButtons />
				<fieldset>
					<legend>Sign in with email/password</legend>
					<div>
						<label htmlFor="email">
							Email:
							<input type="text" placeholder="Email" {...email} />
						</label>
					</div>
					<div>
						<label htmlFor="password">
							Password:
							<input type="password" placeholder="Password" {...password} />
						</label>
					</div>
					<button type="submit" disabled={isInvalid}>
						Submit
					</button>
				</fieldset>
				{error && (
					<>
						<p>{`Error code ${error.code}`}</p>
						<p>{`Error message ${error.message}`}</p>
					</>
				)}
			</form>
			<PasswordForgetForm />
		</>
	)
}

export default SignInForm_Dev
