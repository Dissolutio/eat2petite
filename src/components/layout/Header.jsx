import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap'

import { useUIContext } from '../../contexts/useUIContext'

import NavLinks from '../navigation/NavLinks'
import CurrentUserReadout from '../authentication/CurrentUserReadout'

export default function Header(props) {
	const { user } = props
	const { menuOpen, toggleMenuOpen, setMenuClose } = useUIContext()
	return (
		<StyledHeader>
			<Navbar expand="md">
				<Link className='p-2' to="/" onClick={setMenuClose}>
					<h1>Eat-2-Petite</h1>
				</Link>
				<NavbarToggler onClick={toggleMenuOpen} className='custom-toggler' />
				<Collapse isOpen={menuOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavLinks user={user} />
						<CurrentUserReadout user={user} />
					</Nav>
				</Collapse>
			</Navbar>
		</StyledHeader>
	)
}

const StyledHeader = styled.header`
background-color: var(--gray1);
	h1{
		color: var(--E2P-orange);
		font-family: 'Sofia';
		font-size: 1.5rem;
	}
	a {
		color: var(--E2P-orange);
		font-size: 1.2rem;
	}
	button {
		color: var(--E2P-ginger);
		border-color: var(--E2P-ginger);
	}
	.custom-toggler .navbar-toggler-icon {
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(181, 119, 0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler.navbar-toggler {
	border-color: var(--E2P-ginger);
}
`
