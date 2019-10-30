import React from 'react'
import { Link } from 'react-router-dom'
import { AdminPostDetailLink } from '../layout/Links'

export default function AdminPostsList(props) {
	const { posts } = props
	return (
		<ul>
			<h2>Posts List</h2>
			{posts ? Object.values(posts).map(post => (
				<li key={post.uid}>
					<ul>
						<li>
							<Link to={`/user/admin/posts/${post.uid}`}>{`uid: ${post.uid}`}</Link>
						</li>
						<AdminPostDetailLink id={post.uid} />
						<li>{`contestId: ${post.contestId}`}</li>
						<li>{`userId: ${post.userId}`}</li>
						<li>{`challengeId: ${post.challengeId}`}</li>
						<li>{`postDate: ${post.postDate}`}</li>
						{/* <li>{post.postData}</li> */}
					</ul>
				</li>
			))
				: 'No Posts Found'
			}
		</ul>
	)
}
