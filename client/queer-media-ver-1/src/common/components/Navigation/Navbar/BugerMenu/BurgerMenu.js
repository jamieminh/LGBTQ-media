import React, { useState } from 'react';
import './BurgerMenu.css'

const BurgerMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleBurgerMenu = () => {
        props.onClickHandler()
        setIsOpen(!isOpen)
    }

    return (
        <div className={isOpen ? "BurgerMenu open" : "BurgerMenu"} onClick={toggleBurgerMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
 
export default BurgerMenu;