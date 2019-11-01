import React from 'react'
import styled from 'styled-components'

export const AppStyle = styled.div`
	min-height: 100%;
	color: var(--font-dark);
	background-color: #d5fefd;
background-image: linear-gradient(315deg, var(--white) 75%, beige 75%);
`

export const PageStyle = (props) => (
	<PageStyleWrapper>
		{props.children}
	</PageStyleWrapper>
)
const PageStyleWrapper = styled.div`
	min-height: 100vh;
`