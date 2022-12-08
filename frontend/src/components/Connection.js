import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/connection.css"
import "../styles/App.css"
//import { response } from '../../../backend/app';

export function allComplete(string1, string2) {
    return !((string1 === "") || (string2 === ""))
}

const Connection = () => {

    const [email, setEmail] = useState(null)
    const [mdp, setMdp] = useState(null)
    const navigate = useNavigate();

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/home');
    };

    const login_verif = async (e) => {
        if(allComplete(email, mdp)) {
            e.preventDefault();
            const hashedPassword = bcrypt.hashSync(mdp, "$2a$10$sZk/IsTrgMV.iO0dRgU/xu");        
            let values = {
                "email":email,
                "password": hashedPassword
            }
            axios.post("http://localhost:3001/user/login", values, { withCredentials: true })
                .then(response => {
                    alert("Vous êtes connecté")
                    navigateToHome()
                    window.location.reload(false)
                })
                .catch(response => {
                    console.log(response.response.status)
                    alert("Email ou mot de passe incorrect")
                })
        } else {
            alert("Veuillez compléter tous les champs")
        }
        
    }
    return (

        <div id="connection">
            <h2>Se connecter</h2>
            <form className='form_connection'>
                <div className="text_zone">
                    <i className="fa-sharp fa-solid fa-envelope"></i>
                    <input type="string" placeholder='Email du compte' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="text_zone">
                    <i className="fa-sharp fa-solid fa-lock"></i>
                    <input type="password" placeholder='Mot de passe' onChange={(e) => setMdp(e.target.value)} />
                </div>
                <div className="text_zone_button" onClick={login_verif}>
                    Connexion
                </div>
                <div className="text_zone_button">
                    Mot de passe oublié ?
                </div>
            </form>
        </div>

);
};

export default Connection;