import React from 'react'
import UserPostCard from './UserPostCard'

export default function UserPostDetail(props) {
	const { post, currentUser } = props
	return <UserPostCard post={post} currentUser={currentUser} />
}
