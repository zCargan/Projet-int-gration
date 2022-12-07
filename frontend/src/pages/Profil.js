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
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [objectifs, setObjectifs] = useState([])
    const navigateToHome = () => {
        navigate('/home');
    };
    const navigateToModifierObjectif = (objectif_name) => {
        console.log(objectif_name)
        navigate('/modifierObjectif', {state:{name:objectif_name}});
    };
    useEffect(() => {
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession = res.data.Id
            console.log(res.data.Id)
            if (typeof(idSession) !== "string"){
                navigateToInscription()
            }
            else{
                axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                    if (response.data === null){
                        navigateToInscription()
                    }
                    else{
                        setId(response.data.idUser)
                        axios.get(`http://localhost:3001/user/${response.data.idUser}`, { params: { "id": id } }).then(res => {
                            setObjectifs(res.data.objectifs)
                            setUsername(res.data.username)
                            setEmail(res.data.email)
                        })
                    }
              })
            }
            })
        }, []);

    function supprimerObjectifs(objectifToDelete, objectifs) {
        let arrayObjectif=objectifs;
        let myIndex = arrayObjectif.indexOf(objectifToDelete);
        if (checkIfHigherThan0(myIndex)) {
            arrayObjectif.splice(myIndex, 1);
        }
        let query_choisie = {"id" : document.cookie, objectifs : arrayObjectif}
        axios.post("http://localhost:3001/user/objectif", query_choisie).then(alert("Objectif supprimé avec succès !"))
        window.location.reload(false);
    };

    function deconnexion(){
        console.log(id)
        axios.get('http://localhost:3001/deletecookie', { params: { "id":id } }, { withCredentials: true })
            .then(res => {
            }
            )
            navigateToHome()
            window.location.reload(false)
    }

    return (
        <>
            <div className='profil'>
                <h2>Mon profil :</h2>
                <div className='text'>
                    <i className="fa-solid fa-circle-user"></i>
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
                {objectifs.map((objectif) => 
                    { return <li  className="objectifs" key={objectif.name}> <p className="titre-objectifs">{objectif.name}</p><i className="fa-solid fa-pencil" onClick={()=>{navigateToModifierObjectif(objectif.name)}}></i><i className="fa-solid fa-circle-xmark" onClick={() => {supprimerObjectifs(objectif, objectifs)}}></i></li>}
                )}
            </ul>
            <p className="deconnexion" onClick={deconnexion}>
                Déconnexion
            </p>
        </>
    );
}

export default Profil;