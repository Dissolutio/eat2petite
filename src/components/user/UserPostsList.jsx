import React from 'react'
import UserPostCard from './UserPostCard'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
export default function UserPostsList(props) {
	const { user } = useAuthUserContext()
	const { posts, currentUser } = props
	const postsArray = Object.keys(posts).map(key => ({ ...posts[key], uid: key }))

	return (
		<>
			<h2>User Posts List</h2>
			{postsArray.map(post => (
				<UserPostCard key={post.uid} post={post} currentUser={currentUser} />
			))}
		</>
	)
}
