import React from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'

export const AppStyle = styled.div`
	min-height: 100%;
	color: var(--font-dark);
`

export const PageStyle = (props) => (
	<PageStyleWrapper fluid className="text-center p-4">
		{props.children}
	</PageStyleWrapper>
)
const PageStyleWrapper = styled(Container)`
	min-height: 100vh;
	max-width: 750px;
`