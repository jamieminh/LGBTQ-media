import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css'

const footer = () => {
    return (
        <footer>

            <div className="SocialMedia">
                <a href="#"><i className="fab fa-facebook mr-5"></i></a>
                <a href="#"><i className="fab fa-twitter mr-5"></i></a>
                <a href="#"><i className="fab fa-instagram "></i></a>
            </div>

            <div className="MainFooter">
                {/* Column */}
                <div className="AppDescription">
                    <h3 className="text-uppercase">QUEER MEDIA</h3>
                    <hr style={{ width: '130px' }} />
                    <p>Brings you as many LGBT TV Shows and Movies that has ever existed since the 90s as possible.</p>
                </div>

                {/* Second Column */}
                <div className="LinksCol">
                    <h3 className="text-uppercase">LINKS</h3>
                    <hr style={{ width: '50px' }} />
                    <ul className="list-unstyled">
                        <li>
                            <NavLink to="/">Something</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Something</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Column */}
                <div className="ContactCol">
                    <h3 className="text-uppercase">CONTACTS</h3>
                    <hr style={{ width: '100px' }} />

                    <ul className="list-unstyled">
                        <li className="my-2">
                            <i className="fas fa-map-marked-alt mr-3"></i>Address
                                </li>
                        <li className="my-2">
                            <i className="fas fa-envelope mr-3"></i>Mail
                                </li>
                        <li className="my-2">
                            <i className="fas fa-phone mr-3"></i>Phone number
                                </li>

                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="FooterCopyright"> © 2021 Copyright: Hue Nguyen</div>

        </footer >
    );
}

export default footer;