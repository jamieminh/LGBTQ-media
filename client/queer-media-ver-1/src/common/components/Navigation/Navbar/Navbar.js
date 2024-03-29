import React, { useState } from 'react';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom'
import LoggedinNav from './LoggedInNav/LoggedInNavItem';
import { useSelector } from 'react-redux';
import LoginNav from './LoginNav/LoginNav';

import './Navbar.css'
import './BurgerMenu.css'


const Navbar = () => {

    const pages = [
        { name: 'Home', link: '/' },
        { name: 'Movies', link: '/movies' },
        { name: 'Shows', link: '/series' },
        { name: 'Genres', link: '/genres' },]

    const [clicked, setClicked] = useState(false)
    const subPages = useSelector(state => state.auth.pages)

    const authNavItem = subPages ? <LoggedinNav pages={subPages} /> : <LoginNav />

    const burgerMenuToggleHandler = () => {
        setClicked(!clicked)
    }

    const closeOnClickItem = () => {
        setClicked(false)
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

            {/* Burger Menu  */}
            <div className={clicked ? "BurgerMenu open" : "BurgerMenu"} onClick={burgerMenuToggleHandler}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={clicked ? 'NavItems active' : 'NavItems noactive'}>
                {pages.map(page =>
                    <li key={'nav-' + page.name} onClick={closeOnClickItem}><NavLink
                        className="NavItemLink"
                        to={page.link}
                        exact
                    >{page.name}</NavLink></li>)}

                {authNavItem}
            </ul>
        </nav>
    );
}

export default Navbar;