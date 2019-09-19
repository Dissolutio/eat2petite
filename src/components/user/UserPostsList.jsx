import React from 'react'
import { Link } from 'react-router-dom'
import { UserPostDetailLink } from '../navigation/Links'

export default function UserPostsList(props) {
	const { posts } = props
	return (
		<ul>
			<h2>Sample Posts List</h2>
			{posts.map(post => (
				<li key={post.uid}>
					<ul>
						<UserPostDetailLink id={post.uid} />
						<li>{`contestId: ${post.contestId}`}</li>
						<li>{`userId: ${post.userId}`}</li>
						<li>{`challengeId: ${post.challengeId}`}</li>
						<li>{`postDate: ${post.postDate}`}</li>
						{/* <li>{post.postData}</li> */}
					</ul>
				</li>
			))}
		</ul>
	)
}
