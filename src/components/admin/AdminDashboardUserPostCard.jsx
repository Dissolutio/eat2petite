import React from 'react'
import { Container, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
export default function AdminDashboardUserPostCard(props) {
    const { post, user } = props
    return (
        <>
            <Col xs='6'>
                <Card body>
                    <Button>{user.username}</Button>
                </Card>
            </Col>
            <Col xs='6'>
                <Card body>
                    <Button>Post</Button>
                </Card>
            </Col>
        </>
    )
}
