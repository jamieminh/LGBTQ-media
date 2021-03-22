import React, { useState } from 'react';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom'

import './Navbar.css'
import BurgerMenu from './BugerMenu/BurgerMenu';

const Navbar = () => {

    const pages = [
        { name: 'Home', link: '/' },
        { name: 'Movies', link: '/movies' },
        { name: 'Shows', link: '/series' },
        { name: 'Animations', link: '/animation' },
        { name: 'Genres', link: '/genres' },
        { name: 'Login', link: '/login' }]

    const [clicked, setClicked] = useState(false)

    const burgerMenuToggleHandler = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="Navbar" >
            <Logo />
            <NavLink to="/" exact className="NavbarText">
                <span id="queer-1">Q</span>
                <span id="queer-2">U</span>
                <span id="queer-3">E</span>
                <span id="queer-4">E</span>
                <span id="queer-5">R</span>
                <span id="queer-6"> M</span>
                <span id="queer-7">E</span>
                <span id="queer-8">D</span>
                <span id="queer-9">I</span>
                <span id="queer-10">A</span>
            </NavLink>

            <BurgerMenu onClickHandler={burgerMenuToggleHandler} />
            <ul className={clicked ? 'NavItems active' : 'NavItems noactive'}>
                {pages.map(page =>
                    <li key={'nav-' + page.name}><NavLink
                        className="NavItemLink"
                        to={page.link}
                        exact
                    >{page.name}</NavLink></li>)}
            </ul>
        </nav>
    );
}

export default Navbar;