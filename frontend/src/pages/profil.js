import '../styles/App.css'
import '../styles/objectifs.css'
import '../styles/profil.css'
import ModifierProfil from '../components/ModifierProfil.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Popup from "reactjs-popup";
import Ville from '../components/Ville'

export function checkIfHigherThan0(number) {
    if (Number.isInteger(number)) {
        return number >= 0
    }
    else {
        return "Ce n'est pas un nombre"
    }
}


function Profil() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");


    function function1() {
        console.log(data)
    }

    function supprimerObjectifs(objectifToDelete, data) {
        let arrayObjectif = data;
        let myIndex = arrayObjectif.indexOf(objectifToDelete);
        if (checkIfHigherThan0(myIndex)) {
            arrayObjectif.splice(myIndex, 1);
        }
        let query_choisie = { "id": document.cookie, objectifs: arrayObjectif }
        axios.post("http://localhost:3001/user/objectif", query_choisie).then(alert("Objectif supprimé avec succès !"))
        window.location.reload(false);
    };

    let nouveauxObjectifs = [];

    const navigateToHome = () => {
        navigate('/home');
    };

    function supprimerObjectifs(objectifToDelete, data) {
        let arrayObjectif=data;
        let myIndex = arrayObjectif.indexOf(objectifToDelete);
        if (checkIfHigherThan0(myIndex)) {
            arrayObjectif.splice(myIndex, 1);
        }
        let query_choisie = {"id" : document.cookie, objectifs : arrayObjectif}
        axios.post("http://localhost:3001/user/objectif", query_choisie).then(alert("Objectif supprimé avec succès !"))
        window.location.reload(false);
    };
    useEffect(() => {
        let id = document.cookie.split("=")[1];
        axios.get(`http://localhost:3001/user/${id}`, { params: { "id": document.cookie } }).then(res => {
            for (let i = 0; i < res.data; i++) {
                nouveauxObjectifs.push(res.data.objectifs[i])
            }
            setData(res.data.objectifs)
            setUsername(res.data.username)
            setEmail(res.data.email)

        })}, []);
    function deconnexion(){
        axios.get('http://localhost:3001/deletecookie', { withCredentials: true })
            .then(res => {
                document.cookie = ""
                console.log(document.cookie)
                navigateToHome()
                window.location.reload(false)
            }
            )
    }

    return (
        <>
            <div className='profil'>
                <h2>Mon profil :</h2>
                <i className="fa-solid fa-circle-user"></i>
                <div className='text'>
                    <p className="username">Pseudonyme : {username}</p>
                    <p className="email">Adresse email : {email}</p>
                </div>
            
            <Popup trigger={<button className="modifierProfil"> Modifier profil</button>} position="center">
            {close => (
                <div>
                <Ville/>
                <ModifierProfil/>              
                <button onClick={() => {close(); }} className="button_submit">Annuler</button>
                </div>
                )}
            </Popup>
            </div>
        <h2 className='objectifs-profil'>Mes objectifs</h2>
            <ul>
                {data.map((objectif) =>
                    <li key={objectif} className="objectifs"> <p className="titre-objectifs">{objectif}</p> <i class="fa-solid fa-eye" onClick={() => { function1() }}></i> <i className="fa-solid fa-circle-xmark" onClick={() => { supprimerObjectifs(objectif, data) }}></i></li>
                )}
            </ul>
            <p className="deconnexion" onClick={deconnexion}>
                Déconnexion
            </p>
        </>
    );
}

export default Profil;