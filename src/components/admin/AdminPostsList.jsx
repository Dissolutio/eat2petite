import React from 'react'
import { AdminPostDetailLink } from '../layout/Links'

export default function AdminPostsList(props) {
	const { posts } = props
	if (!posts) { return 'No posts found!' }
	const userIdsArr = Object.keys(posts)
	const postsByUserId = Object.values(posts)
	const allPosts = userIdsArr.reduce((endArr, userId) => {
		return endArr
	}, [])
	return (
		<ul>
			<h2>Posts List</h2>
			{allPosts && allPosts.map(post => (
				<li key={post.uid}>
					<ul>
						<AdminPostDetailLink postId={post.uid} />
						<li>{`contestId: ${post.contestId}`}</li>
						<li>{`userId: ${post.userId}`}</li>
						<li>{`challengeId: ${post.challengeId}`}</li>
						<li>{`postDate: ${post.postDate}`}</li>
					</ul>
				</li>
			))
			}
		</ul>
	)
}
