import React from 'react'
import { Col, Card, CardHeader, CardBody, CardText } from 'reactstrap'

import { UserPostDetailLink } from '../layout/Links'

export default function UserPostCard(props) {
	const { post, currentUser } = props
	const { uid } = post
	return (
		<Col sm="6" key={uid}>
			<Card color="primary" outline body>
				<CardHeader>
					<UserPostDetailLink postId={uid}>
						<h5>{`Post: ${uid}`}</h5>
					</UserPostDetailLink>
				</CardHeader>
				<CardBody>
					<CardText>{`Post Date: ${post.postDate}`}</CardText>
					<CardText>{`Author: ${currentUser.username}`}</CardText>
					<CardText>{`quantity: ${post.quantityDrank}, units: ${post.quantityDrankUnits}`}</CardText>
					{post.postData.data && (
						<CardText>
							{`[${Object.keys(post.postData.data).map((dataKey, keyIndex) => {
								return (
									dataKey.toString() +
									(keyIndex >= Object.keys(post.postData.data).length - 1 ? ',' : '')
								)
							})}]`}
						</CardText>
					)}
				</CardBody>
			</Card>
		</Col>
	)
}
