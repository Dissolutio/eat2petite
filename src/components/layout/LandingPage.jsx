import React from 'react'
import { Container } from 'reactstrap'
import HeroImage from './HeroImage'
import styled from 'styled-components'
export default function LandingPage() {
	return (
		<>
			<HeroImage />
			<Container className='p-4 mt-5' style={{ maxWidth: '750px' }}>
				<h2 className='text-center'>About Eat-2-Petite</h2>
				<p>
					Eat 2 Petite was born from a simple thought:
					</p>
				<Blockquote className='p-2'>
					<span>"I wish I could just eat my way to thin..."</span>
					<span>-Everybody</span>
				</Blockquote>
				<p>
					Eat 2 Petite is not a one-size-fits-all diet plan. Here, we believe that every person’s life, environment, tastes, and economic situations are unique.
				</p>
				<p>
					Eat 2 Petite wants to teach you about nutrition and how to navigate around unhealthy habits.
					</p>
				<h2 className='text-center'>About the coach</h2>
				<p>
					Jennifer Dotson has a passion for keeping people healthy.
					</p>
				<p>
					From the operating room to her consulting services, she has immersed herself in a world where sharing her knowledge, skills, and just a little push, she can help people on their journey towards improved health.
					</p>
			</Container>
		</>
	)
}
const Blockquote = styled.blockquote`
	font-size: 1.2rem;
	span {
	display: block; 
	font-style: normal; 
	font-weight: bold; 
	margin-top:1rem;
}
`
