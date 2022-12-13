import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/formulaire_inscription.css"


const Inscription = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [samePassword, setSamePassword] = useState("");



    {/*=========================================== RECUPERE LES VARIABLES DE CREACTION DE COMPTE ===========================================*/ }
    const variables = async (e) => {
        e.preventDefault();
        const infos = {
            username,
            email,
            password,
            samePassword
        }

        //variable nécessaire afin d'effectuer à la requete à la db afin de savoir si l'email est déja utilisé ou non


        function checkEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        axios.post("http://localhost:3010/username", infos)
            .then(response => {
                if (response.data == "not ok") {
                    alert("Username already used");
                } else {
                    if (checkEmail(email)) {
                        axios.post("http://localhost:3010/email", infos)
                            .then(response => {
                                if (response.data == "not ok") {
                                    alert("Email already used")
                                } else {
                                    if (password == samePassword) {
                                        if (Number(password.length) < 12) {
                                            alert("Mot de passe trop court")
                                        } else {
                                            axios
                                                .post("http://localhost:3010/inscription", infos)
                                                .then(response => {
                                                    if (response.status == 201) {
                                                        alert("Compte créer !");
                                                    }
                                                });
                                        }
                                    } else {
                                        alert("Vos deux mots de passe ne correspondent pas")
                                    }
                                }
                            })
                    } else {
                        alert("Votre adresse email n'est pas valide")
                    }
                }
            });
    }


    return (
        <div>
            <div>
                <p>Bienvenue sur la page d'inscription</p>
            </div>
            <div>
                <Navbar />
            </div>
            <div>
                <p className='blabla'>
                    Vous pourrez ici vous créer un compte afin de finaliser votre inscription
                </p>
                <form action>
                    <input type="string" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <input type="string" placeholder='Adresse email' onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    
                    <input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input type="password" placeholder='Confirmation du mot de passe' onChange={(e) => setSamePassword(e.target.value)} />
                    <br />
                    <button onClick={variables}>
                        Créer mon compte !
                    </button>
                </form>
            </div>
           
        </div>

    );
};

export default Inscription;