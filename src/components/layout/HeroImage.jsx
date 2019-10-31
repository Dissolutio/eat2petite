import React from 'react'
import styled from 'styled-components'
import { Button, Card } from 'reactstrap'
import { Link } from 'react-router-dom'
import FoodPhoto from '../../assets/ThreeUnsplashEat2PetiteImages/photoByBrookeLarkOnUnsplash504x400.jpg'

export default function HeroImage() {
	return (
		<Card className='shadow'>

			<HeroContainer img={FoodPhoto} >
				<HeroText className='border border-round border-primary p-3'>
					<p>Every body is unique...</p>
					<p>...Shouldn't your diet be?</p>
					<Link style={{ color: 'var(--E2P-ginger)', fontSize: '1.5rem' }} to="/register">

						<Button color='success' size="sm">Sign Up!</Button>
					</Link>
				</HeroText>
			</HeroContainer>
		</Card>
	)
}

const HeroContainer = styled.div`
	background-image: url(${props => props.img});
	height: 400px;
	background-position: middle top;
	background-repeat: no-repeat;
	background-size: cover;
`
const HeroText = styled.div`
	font-family: Arial, Helvetica, sans-serif;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 60%;
	transform: translate(-50%, -50%);
	color: var(--black);
	h1 {
		font-size: 50px;
	}
	button {
		border: none;
		outline: 0;
		display: inline-block;
		padding: 10px 25px;
		color: black;
		background-color: var(--E2P-orange);
		text-align: center;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--E2P-ginger);
		color: white;
	}
`
