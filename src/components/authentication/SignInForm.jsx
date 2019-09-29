import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'

import PasswordForgetForm from './PasswordForgetForm'

import * as ROUTES from '../../routes'
import { sampleUsers } from '../../sampleData'

const SignInForm = props => {
	const email = useInputValue('')
	const password = useInputValue('')
	const firebaseApp = useFirebaseContext()
	const [formError, setFormError] = React.useState({ code: '', message: '' })
	const onFormSubmit = async event => {
		event.preventDefault()
		firebaseApp.doSignInWithEmailAndPassword(email.value, password.value).catch(error => {
			console.log(error)
			setFormError(error)
		})
	}
	const signInAsSampleUser = sampleUser => {
		const { email, password } = sampleUser
		firebaseApp.doSignInWithEmailAndPassword(email, password).catch(error => {
			console.log(error)
			setFormError(error)
		})
	}
	const isInvalid = password === '' || email === ''
	return (
		<Container className="p-1">
			<Form className="p-2 border border-primary rounded" onSubmit={onFormSubmit}>
				<h2 className="text-center">Sign In</h2>
				{formError && formError.message ? <Alert color="danger">{formError.message}</Alert> : null}
				{sampleUsers.slice(0, 2).map(sampleUser => {
					const { username, email } = sampleUser
					return (
						<Button
							key={email}
							onClick={() => signInAsSampleUser(sampleUser)}
							block
							size="sm"
							color="warning">
							Sign in as {`${username}`}
						</Button>
					)
				})}
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
					<Button scolor="primary" type="submit" disabled={isInvalid}>
						Submit
					</Button>
				</FormGroup>
			</Form>
			<Container className="mt-1"></Container>
			<Container className="mt-4 mb-5">
				<p className="text-center">
					Don't have an account?{' '}
					<Button size="lg" outline block>
						<Link to={ROUTES.REGISTER}>Sign Up!</Link>
					</Button>
				</p>
			</Container>
			<PasswordForgetForm />
		</Container>
	)
}

export default SignInForm
