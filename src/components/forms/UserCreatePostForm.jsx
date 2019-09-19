import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
const moment = require('moment')

export default function UserCreatePostForm() {
	const { createUserPost } = useDataContext()
	const { user } = useAuthUserContext()
	const createPostOnSubmit = event => {
		event.preventDefault()
		console.log(event.target)
		let newPost = {
			author: user.uid,
			createdAt: event.target.createdAt.value,
			postData: {
				quantity: event.target.quantity.value,
				quantityUnits: event.target.units.value,
			},
		}
		createUserPost(newPost)
	}
	const today = moment().format('YYYY-MM-DD')
	return (
		<>
			<Form onSubmit={createPostOnSubmit}>
				<h2>Create Post Form</h2>
				<FormGroup>
					<Label for="quantity">Quantity</Label>
					<Input name="quantity" type="number" placeholder="quantity" />
				</FormGroup>
				<Input name="postDate" type="date" defaultValue={today} />
				<Input type="select" name="quantityUnits" defaultValue="cups">
					<option value="cups">Cups</option>
					<option value="ounces">Ounces</option>
					<option value="liters">Liters</option>
				</Input>
				<Button type="submit">Submit</Button>
			</Form>
		</>
	)
}
