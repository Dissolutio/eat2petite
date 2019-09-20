import React from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'

import FoodPhoto from '../../assets/ThreeUnsplashEat2PetiteImages/photoByBrookeLarkOnUnsplash504x400.jpg'

export default function HeroImage() {
	console.log('FoodPhoto import:', FoodPhoto)
	return (
		<HeroContainer img={FoodPhoto}>
			<HeroText>
				<p>Every body is unique...</p>
				<p>...Shouldn't your diet be?</p>
				<Button size="sm">Join Up!</Button>
			</HeroText>
		</HeroContainer>
	)
}

const HeroContainer = styled.div`
	background-image: url(${props => props.img});
	height: 400px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
`
const HeroText = styled.div`
	font-family: Arial, Helvetica, sans-serif;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 60%;
	transform: translate(-50%, -50%);
	color: var(--E2P-orange);
	h1 {
		font-size: 50px;
	}
	button {
		border: none;
		outline: 0;
		display: inline-block;
		padding: 10px 25px;
		color: black;
		background-color: #ddd;
		text-align: center;
		cursor: pointer;
	}
	button:hover {
		background-color: #555;
		color: white;
	}
`
