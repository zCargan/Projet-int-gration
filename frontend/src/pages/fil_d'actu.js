import '../styles/App.css'
import '../styles/fil_actualite.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Recherche from '../components/BarreDeRecherche'

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

    const [infoFollows, setInfoFollows] = useState([])
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    useEffect(() => {
        let object ={}
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
            axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId (response.data.idUser)
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
        let verifie = true;
        for (let i = 0; i < nouveauxObjectifs.length; i++) {
            if (params === "") {
                return "Veuillez entrer un objectif !"
            }
            else if (nouveauxObjectifs[i].name === params.objectif) {
                verifie = false;
            }
        }

        if (verifie) {
            if (params.objectif === "Courir plus") {
                description ="Courir 2x"
                frequence="Hebdomadaire"
                name=params.objectif;
                type=params.type
            } else if (params.objectif === "Aller courir") {
                description ="Courir 2x"
                frequence="Hebdomadaire"
                name=params.objectif;
                type=params.type
            } else if (params.objectif === "Manger moins de viande") {
                description ="Manger moins de viande"
                frequence="Journalier"
                name=params.objectif;
                type=params.type
            } else if (params.objectif === "Apprendre l'anglais") {
                description ="Être B2 avant la fin de l'année"
                frequence="Hebdomadaire"
                name=params.objectif;
                type=params.type
            } else if (params.objectif === "Manger plus de légumes") {
                description ="Manger plus de légumes"
                frequence="Mensuel"
                name=params.objectif;
                type=params.type
            }
        } else {
            alert("L'objectif choisi a déjà été ajouté !")
            return
        }
        objectifUser = {"name":name,"description":description, "type":type, "frequence":frequence, "onProfile":onProfile, "share":share }
        nouveauxObjectifs.push(objectifUser)
        let dataToSend = {"id" : id, "objectifs" : nouveauxObjectifs}

        axios.post("http://localhost:3001/user/objectif", dataToSend).then(alert("Objectif ajouté avec succès !"))
        window.location.reload(false);
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