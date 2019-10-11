import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'

import SignInDevConsole from './SignInDevConsole'
import PasswordForgetForm from './PasswordForgetForm'

import * as ROUTES from '../../routes'

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
	const isInvalid = password === '' || email === ''
	return (
		<Container className="p-1">
			<Form className="p-2 text-center border border-primary rounded" onSubmit={onFormSubmit}>
				<h2 className="text-center">Sign In</h2>
				{formError && formError.message ? <Alert color="danger">{formError.message}</Alert> : null}
				{(process.env.NODE_ENV === 'development') ? <SignInDevConsole setFormError={setFormError} /> : null}
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
