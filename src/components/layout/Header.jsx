import React from 'react'
import styled from 'styled-components'
import { useUIContext } from '../../contexts/useUIContext'
export default function Header() {
	const { toggleMenuOpen } = useUIContext()
	return (
		<>
			<StyledHeader>
				<MenuButton onClick={toggleMenuOpen}>&#9776; Menu</MenuButton>
			</StyledHeader>
		</>
	)
}

const StyledHeader = styled.header`
	background-color: var(--black-dark);
	color: var(--white);
	height: 10%;
	padding: 1rem;
`
const MenuButton = styled.span`
	font-size: 1.5rem;
	cursor: pointer;
`
