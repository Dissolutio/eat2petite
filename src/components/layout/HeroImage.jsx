import React from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import FoodPhoto from '../../assets/ThreeUnsplashEat2PetiteImages/photoByBrookeLarkOnUnsplash504x400.jpg'

export default function HeroImage() {
	return (
		<HeroContainer img={FoodPhoto} >
			<div>
			</div>
			<HeroText className='p-3 text-center'>
				<p>Your body is unique,<br />
					so your diet should be too!
				</p>
				<Link style={{ color: 'var(--E2P-ginger)', fontSize: '1.5rem' }} to="/register">
					<Button>Sign Up!</Button>
				</Link>
			</HeroText>
		</HeroContainer>
	)
}

const HeroContainer = styled.div`
	height: 500px;

	background-image: url(${props => props.img});
	background-repeat: no-repeat;
	background-size: cover;
	background-position:  center;

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	align-items: center;
	place-items: center;
	`

const HeroText = styled.div`
	color: var(--black);
	p {
		font-size: 1.2rem;
	}
	@media screen and (max-width: 500px)  {
		font-size: 1.1rem;
	}
	button {
		border: none;
		color: var(--font-dark);
		font-size: 1.rem;
		background-color: var(--E2P-bright-orange);
		cursor: pointer;
	}
	button:hover {
		background-color: var(--E2P-ginger);
	}
`
