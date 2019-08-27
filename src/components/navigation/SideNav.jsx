import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import CurrentUserReadout from '../authentication/CurrentUserReadout'
import NavLinks from './NavLinks'
import { useUIContext } from '../../modules/hooks/useUIContext'

export default function SideNav() {
    const { menuOpen, toggleMenuOpen } = useUIContext()
    const navProps = useSpring({ width: menuOpen ? '250px' : '0px', opacity: menuOpen ? '1' : '0' })
    return (
        <MySideNav style={navProps} onClick={toggleMenuOpen}>
            <button onClick={toggleMenuOpen}>&times;</button>
            <CurrentUserReadout />
            <NavLinks />
        </MySideNav>
    )
}

const MySideNav = styled(animated.div)`
    height: 100%;
    color: #e0e4cc;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 60px;
    & > button {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;

        background-color: #111;
        color: inherit;
        border: none;
        display: inline-block;
        font-size: 3rem;
        cursor: pointer;
    }
    p {
        padding: 8px 8px 8px 32px;
    }
    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 1.5rem;
        color: inherit;
        display: block;
        transition: 0.3s;
    }
`
