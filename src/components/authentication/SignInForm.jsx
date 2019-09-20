import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'
import PasswordForgetForm from './PasswordForgetForm'
import * as ROUTES from '../../routes'
import { sampleUsers } from '../../sampleData'

const SignInForm = props => {
	const email = useInputValue('')
	const password = useInputValue('')
	const firebaseApp = useFirebaseContext()

	const onFormSubmit = async event => {
		firebaseApp.doSignInWithEmailAndPassword(email.value, password.value).catch(error => console.log(error))
	}
	const signInAsSampleUser = sampleUser => {
		const { email, password } = sampleUser
		firebaseApp.doSignInWithEmailAndPassword(email, password).catch(error => console.log(error))
	}
	const isInvalid = password === '' || email === ''
	return (
		<Container className="p-1">
			<Form className="p-2 border border-primary rounded" onSubmit={onFormSubmit}>
				<h2>Sign In</h2>
				<FormGroup>
					<Label htmlFor="email">
						Email:
						<Input type="email" placeholder="Email" name="email" {...email} />
					</Label>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">
						Password:
						<Input name="password" type="password" placeholder="Password" {...password} />
					</Label>
				</FormGroup>
				<FormGroup className="text-center">
					<Button size="lg" color="primary" type="submit" disabled={isInvalid}>
						Submit
					</Button>
				</FormGroup>
			</Form>
			<Container className="mt-">
				{sampleUsers.slice(0, 2).map(sampleUser => {
					const { username, email } = sampleUser
					return (
						<Button key={email} onClick={() => signInAsSampleUser(sampleUser)}>
							Sign in as {`${username}`}
						</Button>
					)
				})}
			</Container>
			<Container>
				<p>
					Don't have an account?{' '}
					<Button>
						<Link to={ROUTES.REGISTER}>Sign Up!</Link>
					</Button>
				</p>
			</Container>
			<PasswordForgetForm />
		</Container>
	)
}

export default SignInForm
