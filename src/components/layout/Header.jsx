import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap'
import { useUIContext } from '../../contexts/useUIContext'
import NavLinks from '../layout/NavLinks'

export default function Header(props) {
	const { user } = props
	const { menuOpen, toggleMenuOpen, setMenuClose } = useUIContext()
	return (
		<StyledHeader>
			<Navbar color="light" light expand="md">
				<Link to="/" onClick={setMenuClose}>
					Eat-2-Petite
				</Link>
				<NavbarToggler onClick={toggleMenuOpen} />
				<Collapse isOpen={menuOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavLinks user={user} />
					</Nav>
				</Collapse>
			</Navbar>
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
	background-color: var(--white);
	color: var(--font-dark);
	a {
		font-family: 'Sofia', cursive;
		color: var(--E2P-ginger);
		font-size: 1.5rem;
	}
`
