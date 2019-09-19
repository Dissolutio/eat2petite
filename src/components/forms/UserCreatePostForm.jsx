import React from 'react'
import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'

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
	return (
		<div>
			<form onSubmit={createPostOnSubmit}>
				<input name="createdAt" type="date" />
				<input name="quantity" type="text" placeholder="quantity" />
				<select name="units" defaultValue="ounces">
					<option value="cups">Cups</option>
					<option value="ounces">Ounces</option>
					<option value="liters">Liters</option>
				</select>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
