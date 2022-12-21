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

    const navigateToNouvelObjectif = () => {
        // 👇️ navigate to /nouvelObjectif
        navigate('/nouvelObjectif');
      };

    const navigateToNouvelObjectifBase = (objectif_name) => {
        navigate('/nouvelObjectifPredef', {state:{name:objectif_name}});
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
        })
    });

    function ajouterObjectifs(params) {
        navigateToNouvelObjectifBase(params.objectif)
    };

    const rechercherObjectifs = async (e) => {
        let newData = [];
        setData(baseData)

        e.preventDefault();
        const infos = {
            params: {
                objectif: searchedObjectifs
            }
        }
        for (let i = 0; i < baseData.length; i++) {
            if (searchedObjectifs === "") {
                newData.push(baseData[i])
            } else if (baseData[i].objectif.toLowerCase().includes(searchedObjectifs.toLowerCase())) {
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
        <br></br>

        <div> 
            <button className="creerObjectif" onClick={navigateToNouvelObjectif}>Créer un objectif personalisé</button>
        </div>

        <ul>
            {data.map((objectif) =>
                <li key={objectif._id} className="objectifs"> <p className="titre-objectifs">{objectif.objectif}</p><i className="fas fa-circle-plus" onClick={() => {ajouterObjectifs(objectif)}}></i></li>
            )}
        </ul>
        </>
    );
}

export default Objectifs;
