import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images//logoNewMe2.ico';
import "../styles/navbar.css"
import axios from 'axios';

function Navbar() {
    const [click, setClick] = useState(false);
    const [id, setId] = useState("");
    let idSession = ""
    const handleClick = () => setClick(!click);
    const [connecte, setConnecte] = useState(false);

    axios.get('https://www.newme.ovh:3001/getcookie', { withCredentials: true }).then(res => {
        idSession=res.data.Id
        if (typeof(idSession) !== "string"){
            console.log("pas connecté")
            setConnecte(false)
          }
          else{
            axios.get(`https://www.newme.ovh:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                if (response.data === null){
                    setConnecte(false)
                }
                else{
                    setId (response.data.idUser)
                    setConnecte(true)
                }
          })
          }
    })
    if (!connecte){
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
