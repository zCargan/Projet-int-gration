import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images//logoNewMe2.ico';
import "../styles/navbar.css"

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    if (document.cookie === ''){
        return (
            <nav className={click ? 'navbar-active' : 'navbar'}>
                <div className='navbar-container'>
                    <div className="menu-list">
                        <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                        </div>
                        <NavLink to="/" className="navbar-logo">
                            <img src={logo} alt="NewMeLogo" />
                        </NavLink>
                    </div>
                    <ul className="nav-list">
                        <li className='nav-item'>
                            <NavLink to='/home' className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                                Home
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/inscription" className={(state) => state.isActive ? 'nav-links-mobile-active' : 'nav-links-mobile'}>
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    return (
        <nav className={click ? 'navbar-active' : 'navbar'}>
            <div className='navbar-container'>
                <div className="menu-list">
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <NavLink to="/" className="navbar-logo">
                        <img src={logo} alt="NewMeLogo" />
                    </NavLink>
                </div>
                <ul className="nav-list">
                    <li className='nav-item'>
                        <NavLink to='/home' className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                            Home
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/objectifs" className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                            Objectifs
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/carte" className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                            Carte
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/fil_actualite" className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                            Fil d'actualité
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/profil" className={(state) => state.isActive ? 'nav-links-active' : 'nav-links'}>
                            Profil
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
    
}

export default Navbar
