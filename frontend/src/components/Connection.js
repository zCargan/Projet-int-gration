import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/connection.css"
import "../styles/App.css"
import bcrypt from 'bcryptjs'

//import { response } from '../../../backend/app';

const Connection = () => {


    const [email, setEmail] = useState(null)
    const [mdp, setMdp] = useState(null)
    const navigate = useNavigate();
    let hashedMDP =""

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/home');
    };

    const login_verfif = async (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/user/email/${email}`, { "email": email }).then(res => {
            hashedMDP=res.data
            let bool = bcrypt.compareSync(mdp, hashedMDP)
            if (bool){
                let mail = {"email":email}
                axios.post("http://localhost:3001/user/login", mail, { withCredentials: true })
                    .then(response => {
                        alert("Vous êtes connecté")
                        navigateToHome()
                        window.location.reload(false)
                    });
            }
            else{
                alert("Mot de passe incorrect")
            }
        })
        
/*         bcrypt.compare(mdp, hashedMDP)
 */
/*         axios.post("http://localhost:3001/user/login", values, { withCredentials: true })
            .then(response => {
                alert("Vous êtes connecté")
                navigateToHome()
                window.location.reload(false)
            }); */
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
                <div className="text_zone_button" onClick={login_verfif}>
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