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
				<Link id="brand-name" className='p-3' to="/" onClick={setMenuClose}>
					Eat-2-Petite
				</Link>
				<NavbarToggler onClick={toggleMenuOpen} color='primary' />
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
	#brand-name {
		font-family: 'Sofia';
		color: var(--E2P-orange);
		font-size: 1.7rem;
	}
	a {
		color: var(--E2P-ginger);
		font-size: 1.2rem;
	}
	button {
		color: red;
	}
	.navbar-toggler-icon {
		color: red;
	}
`
