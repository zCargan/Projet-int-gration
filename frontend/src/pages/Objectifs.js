import '../styles/App.css'
import '../styles/objectifs.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// Pour effectuer les tests, il faut mettre en commentaire les lignes 1,2 et 4!



export function testajouterObjectifs(params) {
    let nouveauxObjectifs = ["Apprendre l'anglais"];
    if (params === "") {
        return "Veuillez entrer un objectif !"
    }
    else if (nouveauxObjectifs.indexOf(params.objectif) < 0) {
        nouveauxObjectifs.push(params.objectif);
        return nouveauxObjectifs
    } else {
        return "L'objectif choisi a déjà été ajouté !"
    }
}

function Objectifs() {
    const [data, setData] = useState([]);
    const [baseData, setBaseData] = useState([]);
    const [searchedObjectifs, setSearchedObjectifs] = useState("")
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
    const navigate = useNavigate()
    const navigateToInscription = () => {
        navigate('/inscription');
      };

    const navigate = useNavigate();

    const navigateToNouvelObjectif = () => {
        // 👇️ navigate to /nouvelObjectif
        navigate('/nouvelObjectif');
      };

    useEffect(() => {
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
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
        })
        axios.get(`http://localhost:3001/user/${id}`, {params: {"id" : id}}).then(res => {
            for (let i = 0; i < res.data.objectifs.length; i++){
                nouveauxObjectifs.push(res.data.objectifs[i])
            }
        })});

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

    const rechercherObjectifs = async (e) => {
        let newData = [];
        setData(baseData)

        e.preventDefault();
        const infos  = {
            params : {
                objectif: searchedObjectifs
            }
        }
        for (let i = 0; i < baseData.length; i++) {
            if (searchedObjectifs === "") {
                newData.push(baseData[i])
            } else if (baseData[i].objectif.toLowerCase().includes(searchedObjectifs.toLowerCase())){
                newData.push(baseData[i])
            }
        }
        setData(newData)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/objectif').then(res => {
           setData(res.data)
           setBaseData(res.data)
        }).catch(err => console.log(err));
    }, [])
    return (
        <>
        <div className="search-bar">
            <input type="text" placeholder="Recherche" className="searchedObjectifs" onChange={(e) => setSearchedObjectifs(e.target.value)}></input>
            <p className="searchedObjectifsButton" onClick={rechercherObjectifs}>Rechercher</p>
        </div>

        <ul>
            {data.map((objectif) =>
                <li key={objectif._id} className="objectifs"> <p className="titre-objectifs">{objectif.objectif}</p><i className="fas fa-circle-plus" onClick={() => {ajouterObjectifs(objectif)}}></i></li>
            )}
        </ul>

        <div> 
            <button className="creerObjectif" onClick={navigateToNouvelObjectif}>Créer un objectif personalisé</button>
        </div>

        </>
    );
}

export default Objectifs;