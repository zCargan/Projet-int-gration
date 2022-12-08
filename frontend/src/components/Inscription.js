import React, { useState } from 'react';
import axios from 'axios';
import "../styles/inscription.css"
import "../styles/App.css"
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'


export function notXSSInjection(string) {
    return !(string.includes("<"))
}

export function notToLongString(string) {
    return (string.length < 30)
}

export function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function allComplete(string1, string2, string3, string4) {
    return !((string1 === "") || (string2 === "") || (string3 === "") || (string4 === ""))
}

export function allNotToLong(string1, string2, string3, string4) {
    return (notToLongString(string1) && notToLongString(string2) && notToLongString(string3) && notToLongString(string4))
}

export function allNotXSSInjection(string1, string2, string3, string4) {
    return (notXSSInjection(string1) && notXSSInjection(string2) && notXSSInjection(string3) && notXSSInjection(string4))
}

export function sameString(string1, string2) {
    return (string1 === string2)
}

export function HasValidLength(string) {
    return (string.length >= 12)
}

export function HasLowerCaseLetter(string) {
    return (/[a-z]/.test(string))
}

export function HasUpperCaseLetter(string) {
    return (/[A-Z]/.test(string))
}

export function HasSpecialCharacter(string) {
    return (/[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/.test(string))
}

export function HasNumber(string) {
    return (/[0-9]/.test(string))
}

export function HasAll(string) {
    return (HasValidLength(string) && HasLowerCaseLetter(string) && HasUpperCaseLetter(string) && HasSpecialCharacter(string) && HasNumber(string))
}

const Inscription = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [samePassword, setSamePassword] = useState("");
    const passwordHasValidLength = HasValidLength(password);
    const passwordHasLowercaseLetter = HasLowerCaseLetter(password);
    const passwordHasUppercaseLetter = HasUpperCaseLetter(password);
    const passwordHasSpecialCharacter = HasSpecialCharacter(password);
    const passwordHasNumber = HasNumber(password);
    const hashedPassword = bcrypt.hashSync(password, 10);


    /*=========================================== RECUPERE LES VARIABLES DE CREACTION DE COMPTE ===========================================*/
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        axios.get("http://localhost:3001/ville/commune").then(response => {
            let array = [];
            for (let i = 0; i < response.data[0].Villes.length; i++) {
                array.push(response.data[0].Villes[i])
                setVilles(array)
            }
            array = array.sort()
        });
    }, [])

    const variables = async (e) => {
        e.preventDefault();
        const infos = {
            username,
            email,
            password,
            samePassword
        }
        const données_envoyées = {
            "username": username,
            "email": email,
            "password": hashedPassword,
            "confirmed": false,
            "objectifs": [],
            "city": city
        }

        //variable nécessaire afin d'effectuer à la requete à la db afin de savoir si l'email est déja utilisé ou non


        if (allComplete(username, email, password, samePassword)) {
            if (allNotToLong(username, email, password, samePassword)) {
                if (allNotXSSInjection(username, email, password, samePassword)) {
                    if (HasAll(password)) {
                        axios.post("http://localhost:3001/user/username", infos)
                            .then(response => {
                                if (response.data === false) {
                                    alert("Username already used");
                                } else {
                                    if (checkEmail(email)) {
                                        axios.post("http://localhost:3001/user/email", infos)
                                            .then(response => {
                                                if (response.data === false) {
                                                    alert("Email already used")
                                                } else {
                                                    if (sameString(password, samePassword)) {
                                                        if (HasValidLength(password)) {
                                                            axios
                                                                .post("http://localhost:3001/user/inscription", données_envoyées)
                                                                .then(response => {
                                                                    if (response.status === 201) {
                                                                        emailjs.sendForm('service_wco0ss6', 'template_f9ar9zo', e.target, 'uX_z-9_6PbAb24o0e')
                                                                            .then((result) => {
                                                                                console.log(result.text);
                                                                            }, (error) => {
                                                                                console.log(error.text);
                                                                            });
                                                                        e.target.reset()
                                                                        alert("Compte créé ! Un email de confirmation vous a été envoyé")
                                                                        navigateToHome()
                                                                    }
                                                                });
                                                        } else {
                                                            alert("Mot de passe trop court")
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
                    } else {
                        alert("Votre mot de passe ne respecte pas tous les critères")
                    }
                } else {
                    alert("Pas de < autorisé dans vos informations")
                }
            } else {
                alert("Les informations que vous rentrer sont trop longue")
            }

        } else {
            alert("Veuillez compléter tous les champs");
        }
    }
    return (
        <div className="inscription">
            <h2>Pas encore de compte ? Inscrivez-vous !</h2>
            <form className='form_inscription' onSubmit={variables}>
                <div className="text_zone">
                    <i className='fa-sharp fa-solid fa-user'></i>
                    <input type="string" placeholder="Nom d'utilisateur" name='username' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="text_zone">
                    <i className="fa-sharp fa-solid fa-envelope"></i>
                    <input type="string" placeholder='Email du compte' name='user_email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="text_zone">
                <i className="fa-solid fa-house"></i>
                <label className="text_zone">Votre Ville : </label>
                    <select className="selection"value={city} onChange={e => setCity(e.target.value)}>
                        
                        <option>Veuillez séléctionnez votre ville </option>
                        {villes.map((Villes) => (
                            <option key={Villes}>{Villes}</option>
                        ))}
                    </select>
                    
                </div>
                <div className="text_zone">
                    <i className="fa-sharp fa-solid fa-lock"></i>
                    <input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='text_zone'>
                    <label style={{ color: passwordHasValidLength ? 'green' : 'red' }}>Mot de passe de 12 caractères </label>
                    <br />
                    <label style={{ color: passwordHasLowercaseLetter ? 'green' : 'red' }}>Min 1 caractère minuscule</label>
                    <br />
                    <label style={{ color: passwordHasUppercaseLetter ? 'green' : 'red' }}>Min 1 caractère majuscule</label>
                    <br />
                    <label style={{ color: passwordHasNumber ? 'green' : 'red' }}>Min 1 nombre</label>
                    <br />
                    <label style={{ color: passwordHasSpecialCharacter ? 'green' : 'red' }}>Min 1 caractère spécial</label>
                </div>
                <div className="text_zone">
                    <i className="fa-sharp fa-solid fa-lock"></i>
                    <input type="password" placeholder='Confirmer le mot de passe' onChange={(e) => setSamePassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" className="button_submit" value="Valider" />
                </div>
            </form>
        </div>
    );
};
export default Inscription; 