import '../styles/App.css'
import '../styles/fil_actualite.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Recherche from '../components/BarreDeRecherche'
import { useNavigate } from 'react-router-dom'

function Fil_actualite() {
    let follows=[]
    let arrayUser=[]
    let name;
    let description;
    let frequence;
    let onProfile = true;
    let share = true;
    let type;
    const [id, setId] = useState("");
    let idSession = ""
    let nouveauxObjectifs = [];
    let objectifUser;
    const navigate = useNavigate();

    const [infoFollows, setInfoFollows] = useState([])

    const navigateToInscription = () => {
        navigate('/inscription');
    };

    const navigateToNouvelObjectifBase = (objectif_name) => {
        navigate('/nouvelObjectifPredef', {state:{name:objectif_name}});
    };

    useEffect(() => {
        let object ={}
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
            axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId (response.data.idUser)
                if (typeof(idSession) !== "string"){
                    navigateToInscription()
                }
                else{
                    axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                        if (response.data === null){
                            navigateToInscription()
                        }
                        else{
                            setId (response.data.idUser)
                        }
                  })
                }
                axios.get(`http://localhost:3001/user/${response.data.idUser}`, { params: { "id": response.data.idUser } }).then(res => {
                    follows=res.data.userfollows    
                })
                axios.get('http://localhost:3001/user').then(res =>{
                for (let i = 0; i<follows.length;i++){
                    for (let j = 0; j < res.data.length ;j++){
                        if (res.data[j]._id === follows[i] ){
                            if (res.data[j].objectifs.length !==0){
                                for (let k = 0; k < res.data[j].objectifs.length ;k++){
                                    if(res.data[j].objectifs[k].onProfile){
                                        object = {username : res.data[j].username, objectif : res.data[j].objectifs[k]}
                                        arrayUser.push(object)
                                    }
                                }
                            }
                        }
                    }
                }
                setInfoFollows(arrayUser)
                })
            })
        })
        
    }, []);  
    function ajouterObjectifs(params) {
        navigateToNouvelObjectifBase(params.objectif.name)
    };



    return (
        <>
        <Recherche/>
         <ul>
            {infoFollows.map((objectif,n) => 
                { return <li  className="objectifs" key={n}> <p className="text-objectifs"><u className='text-important'>{objectif.username}</u> essaie d'adopter cette bonne habitude : <u className='text-important'>{objectif.objectif.name}</u> ! Veux-tu l'ajouter à tes objectifs ?</p><i className="fas fa-circle-plus" onClick={() => {ajouterObjectifs(objectif)}}></i></li>}
            )}
        </ul>
        </>
    );
}

export default Fil_actualite;