import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap'
import { useUIContext } from '../../contexts/useUIContext'
import NavLinks from '../navigation/NavLinks'

export default function Header() {
	const { menuOpen, toggleMenuOpen } = useUIContext()
	return (
		<StyledHeader>
			<Navbar color="light" light expand="md">
				<Link style={{ color: 'var(--E2P-ginger)', fontSize: '2rem' }} to="/">
					Eat-2-Petite
				</Link>
				<NavbarToggler onClick={toggleMenuOpen} />
				<Collapse isOpen={menuOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavLinks />
					</Nav>
				</Collapse>
			</Navbar>
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
	background-color: var(--white);
	color: var(--font-dark);
`
