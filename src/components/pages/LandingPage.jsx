import React from 'react'
import { Container, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import HeroImage from '../layout/HeroImage'
export default function LandingPage() {
	return (
		<>
			<HeroImage />
			<Container>
				<Container>
					<h1>About Eat-2-Petite</h1>
					<p>
						Helping marketers serve unmatched cross-phase personalized experiences at every step of the
						FirstSpriti Digital Experience Platform powers enterprise-class. Clicking on this link which
						refers to B2B Marketing awards shortlist will take you to the awards page of the customer
						journey.
					</p>
				</Container>
				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle>Eat-2-Petite Contest #1 Is Live!</CardTitle>
							<CardText>Be sure to checkin and meet your goals!</CardText>
							<Button>Go somewhere</Button>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle>We are running a 5k!</CardTitle>
							<CardText>Join the team for the Eat-2-Petite World Championship 5k this year!</CardText>
							<Button>Do something</Button>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}
