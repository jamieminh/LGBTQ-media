import React from 'react';
import {NavLink} from 'react-router-dom';

import './Footer.css'

const footer = () => {
    return (
        <footer className="page-footer">

            <div className="SocialMedia">
                <div className="container">
                    <div className="row py-4 d-flex align-items-center">
                        <div className="col-md-12 text-center">
                            <a href="#"><i className="fab fa-facebook mr-5"></i></a>
                            <a href="#"><i className="fab fa-twitter mr-5"></i></a>
                            <a href="#"><i className="fab fa-instagram "></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 MainFooter">
                <div className="container-fluid text-center text-md-left my-4 custom">
                    <div className="row">
                        {/* Column */}
                        <div className="col-md-6 col-lg-4 mt-md-0 mt-3 AppDescription">
                            <h5 className="text-uppercase">QUEER MEDIA</h5>
                            <hr className="bg-success mb-3 mt-0 d-inline-block mx-auto" style={{width: '130px'}}/>
                            <p>Brings you as many LGBT TV Shows and Movies that has ever existed since the 90s as possible.</p>
                        </div>

                        {/* <hr className="clearfix w-100 d-md-none pd-3"/> */}

                        {/* Second Column */}
                        <div className="col-md-6 col-lg-2 mb-md-0 mb-3 LinksCol">
                            <h5 className="text-uppercase">Links</h5>
                            <hr className="bg-success mb-3 mt-0 d-inline-block mx auto" style={{width: '80px'}}/>
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
                        <div className="col-md-6 col-lg-3 mb-md-0 mb-3 ContactCol">
                            <h5 className="text-uppercase">Contacts</h5>
                            <hr className="bg-success mb-3 mt-0 d-inline-block mx auto" style={{width: '100px'}}/>

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

                        {/* Column */}
                        <div className="col-md-6 col-lg-3 mb-md-0 mb-3 NewsletterCol">
                            <h5 className="text-uppercase">Newsletter</h5>
                            <hr className="bg-success mb-3 mt-0 d-inline-block mx auto" style={{width: '130px'}}/>

                            <form action="" className="newsletter">
                                <div className="input-group">
                                    <input type="email" className="form-control" id="email" placeholder="Your email address..."/>
                                    <span className="input-group-append">
                                        <button type="button" className="btn border border-left-0">
                                            <span className="text-uppercase font-weight-bold">sign up</span>
                                        </button>
                                    </span>
                                </div>
                            </form>

                            
                        </div>
                    </div>
                </div>
                {/* End Grid Row */}
            </div>

            {/* Copyright */}
            <div className="FooterCopyright text-center py-3"> © 2020 Copyright: Hue Nguyen</div>

        </footer>
    );
}
 
export default footer;