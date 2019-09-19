import React from 'react'
import { Badge, Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'
import { UserPostDetailLink } from '../navigation/Links'
export default function UserPostsList(props) {
	const { posts, currentUser } = props
	const postsArray = Object.keys(posts).map(key => ({ ...posts[key], uid: key }))
	return (
		<>
			<h2>User Posts List</h2>
			{postsArray.map(post => (
				<Col sm="6" key={post.uid}>
					<Card color="primary" outline body>
						<CardHeader>
							<UserPostDetailLink id={post.uid}></UserPostDetailLink>
						</CardHeader>
						<CardBody>
							<CardText>{`Post Date: ${post.postDate}`}</CardText>
							<CardText>{`Author: ${currentUser.username}`}</CardText>
							<CardText>{`quantity: ${post.postData.quantity}, units: ${post.postData.quantityUnits}`}</CardText>
						</CardBody>
					</Card>
				</Col>
			))}
		</>
	)
}
