import React from 'react'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
// import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
const moment = require('moment')

export default function WaterChallengePostForm() {
	// const { createUserPost } = useDataContext()
	const { user } = useAuthUserContext()
	const createPostOnSubmit = event => {
		event.preventDefault()
		console.log(event.target)
		let newPost = {
			author: user.uid,
			createdAt: new Date(),
			postData: {
				quantity: event.target.quantity.value || 0,
				quantityUnits: event.target.quantityUnits.value,
			},
		}
		console.log('new Post:', newPost)
		// createUserPost(newPost)
	}
	const today = moment().format('YYYY-MM-DD')
	return (
		<Container>
			<Form onSubmit={createPostOnSubmit} className="border border-primary rounded p-4 mt-4 mb-3 text-center">
				<h2>Water Challenge Post Form</h2>
				<FormGroup>
					<Label for="postDate">Post Date</Label>
					<Input name="postDate" type="date" defaultValue={today} />
				</FormGroup>
				<FormGroup>
					<Label for="quantity">Quantity</Label>
					<Input name="quantity" type="number" placeholder="quantity" />
				</FormGroup>
				<FormGroup>
					<Label for="quantityUnits">Units</Label>
					<Input type="select" name="quantityUnits" defaultValue="cups">
						<option value="cups">Cups</option>
						<option value="ounces">Ounces</option>
						<option value="liters">Liters</option>
					</Input>
				</FormGroup>
				<Button type="submit">Submit</Button>
			</Form>
		</Container>
	)
}
