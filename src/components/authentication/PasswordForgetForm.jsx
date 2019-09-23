import React, { useState } from 'react'
import { Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'

const PasswordForgetForm = () => {
	const email = useInputValue('')
	const [formData, setFormData] = useState({
		isSent: false,
	})
	const { isSent } = formData
	const firebaseApp = useFirebaseContext()

	const onSubmit = event => {
		event.preventDefault()
		firebaseApp.doPasswordReset(email.value)
		setFormData({ ...formData, isSent: true })
	}
	const isInvalid = email === ''
	return isSent ? (
		<Alert color="success">Password Reset Email Sent!</Alert>
	) : (
		<Form onSubmit={onSubmit}>
			<h3 className="text-center">Password Reset</h3>
			<FormGroup>
				<Label htmlFor="email">
					Email address:
					<Input type="email" placeholder="Email" {...email} />
				</Label>
			</FormGroup>
			<Button disabled={isInvalid} type="submit" color="success" outline>
				Send Password Reset Email
			</Button>
		</Form>
	)
}
export default PasswordForgetForm
