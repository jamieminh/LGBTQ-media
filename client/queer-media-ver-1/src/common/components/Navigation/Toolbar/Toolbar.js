import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItem from './NavigationItem/NavigationItem'
import { useSelector } from 'react-redux';

// class Toolbar extends Component { 
const Toolbar = (props) => {
    const NavItem = useSelector(state => state.auth.NavItem)
    

    // state = {
    //     show: true
    // }

    // componentDidUpdate(prevProps, prevState){
    //     window.onclick((e) => {
    //         this.setState({show: false})
    //     })
    // }

    // render() {
    //     const isShow = (this.state.show) ? "show" : '';        

    
    return (
        
        <React.Fragment>
        <nav className="navbar navbar-expand-sm Navbar" >
            <Logo />
            <NavLink to="/" exact className="navbar-brand NavbarText">
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

          
            <div className="text-right ToggleNavbarBtn" >
                <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                    <i className="fa fa-bars" ></i>
                </button>
            </div>

            <div className="collapse navbar-collapse text-left navbar-right" id="myNavbar">                
                <div className="ml-auto"></div>
                
                <ul className="navbar-nav flex-nowrap">
                    <li>
                        <div className="TogglerInside">
                            <button className="navbar-toggler custom-toggler-inside" type="button" data-toggle="collapse" data-target="#myNavbar">
                                <i className="fa fa-times" ></i>
                            </button>
                        </div>
                    </li>

                    <NavigationItem link="/">Home</NavigationItem>
                    <NavigationItem link="/movies">Movies</NavigationItem>
                    <NavigationItem link="/series">Series</NavigationItem>
                    <NavigationItem link="/animation">Animation</NavigationItem>
                    <NavigationItem link="/genres">Genres</NavigationItem>                                                         
                    {/* <AuthenticationButton />                                                          */}
                    {NavItem}
                </ul>
            </div>
        </nav>
        </React.Fragment>
    )

                };
// }
 
export default Toolbar;