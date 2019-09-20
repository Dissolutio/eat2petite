import React from 'react'
import { Col, Card, CardHeader, CardBody, CardFooter, CardTitle, CardText } from 'reactstrap'

import { useAuthUserContext } from '../../contexts/useAuthUserContext'

import { UserPostDetailLink } from '../navigation/Links'

export default function UserPostCard(props) {
	const { user } = useAuthUserContext()
	const { post } = props
	return (
		<Col sm="6" key={post.uid}>
			<Card color="primary" outline body>
				<CardHeader>
					<UserPostDetailLink id={post.uid}></UserPostDetailLink>
				</CardHeader>
				<CardBody>
					<CardText>{`Post Date: ${post.postDate}`}</CardText>
					<CardText>{`Author: ${user.username}`}</CardText>
					<CardText>{`quantity: ${post.postData.quantity}, units: ${post.postData.quantityUnits}`}</CardText>
					{post.postData.data && (
						<CardText>
							{`[${Object.keys(post.postData.data).map((dataKey, keyIndex) => {
								return (
									dataKey.toString() +
									(keyIndex >= Object.keys(post.postData.data).length - 1 ? ',' : '')
								)
							})}]`}
							}
						</CardText>
					)}
				</CardBody>
			</Card>
		</Col>
	)
}
