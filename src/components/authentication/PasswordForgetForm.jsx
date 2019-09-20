import React, { useState } from 'react'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from '../../modules/hooks/useInputValue'

const PasswordForgetForm = () => {
	const email = useInputValue('')
	const [formData, setFormData] = useState({
		error: null,
		isSent: false,
	})
	const { error, isSent } = formData
	const firebaseApp = useFirebaseContext()

	const onSubmit = event => {
		event.preventDefault()
		firebaseApp.doPasswordReset(email.value)
		setFormData({ ...formData, isSent: true })
	}
	const isInvalid = email === ''
	return isSent ? (
		<div>Password Reset Email Sent!</div>
	) : (
		<form onSubmit={onSubmit}>
			<fieldset>
				<legend>Password Reset</legend>
				<div>
					<label htmlFor="email">
						Email address:
						<input type="text" placeholder="Email" {...email} />
					</label>
				</div>
				<button disabled={isInvalid} type="submit">
					Send Password Reset Email
				</button>
			</fieldset>
			{error && <p>{error.message}</p>}
		</form>
	)
}
export default PasswordForgetForm
