import React from 'react'
import UserPostCard from './UserPostCard'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
export default function UserPostsList(props) {
	const { user } = useAuthUserContext()
	const { posts, currentUser } = props
	const postsArray = posts && Object.keys(posts).map(key => ({ ...posts[key], uid: key }))

	return (
		<>
			<h2>User Posts List</h2>
			{postsArray ? (
				postsArray.map(post => <UserPostCard key={post.uid} post={post} currentUser={currentUser} />)
			) : (
				<div>No user posts found.</div>
			)}
		</>
	)
}
