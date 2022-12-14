import React, { useState ,useEffect} from 'react';
import "../styles/App.css"
import axios from 'axios'
import "../styles/nouvelObjectif.css"

function NouvelObjectif(){

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [recurence, setRecurence] = useState("");
    const [type, setType] = useState("");
    const [onProfile, setOnProfile] = useState("");

    
    let id = document.cookie.split("=")[1];

    const send = async(e) => {

        let ArrayObjectifs = []
        console.log(ArrayObjectifs.length)

        let dataUser = {
            "name" : titre,
            "description" : description,
            "type" : type,
            "frequence" : recurence,
            "onProfile" : true,
            "share" : true

        }

        const dataObjectif = {
            "type" : type,
            "objectif" : titre,
        }        

        axios.post("http://localhost:3001/objectif/",
            dataObjectif
        )
        .catch(err => console.warn(err));

        axios.get(`http://localhost:3001/user/${id}`, {params : {"id" : document.cookie}}).then(res => {
            for (let i = 0; i < res.data.objectifs.length; i++){
                ArrayObjectifs.push(res.data.objectifs[i])
            }
            //console.log("1",res.data.objectifs)
           //ArrayObjectifs.push(res.data.objectifs)
           //console.log(dataUser)
           console.log("2",ArrayObjectifs)
           ArrayObjectifs.push(dataUser)
            let jsonToSend = {"id" : id, "objectifs" : ArrayObjectifs}
            console.log("4",jsonToSend)
            axios.post('http://localhost:3001/user/objectif',jsonToSend)
            .catch(err => console.warn(err));
           //ArrayObjectifs.push(dataUser)
        })
        .catch(err => console.warn(err));

        console.log("3",ArrayObjectifs)

        
        //window.location.reload(false);
        
    }

    return(
        <div className="nouvelObjectif">
            <form>
                    <h2>Créer un objectif : </h2>
                    <label>Titre de l'objectif : </label>
                    <input type="text" className="titreObjectif" onChange={(e) => setTitre(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <label>Récurence :  </label>
                    <br></br>
                    <br></br>
                    <input className="recurence" type="button" value="Journalier" onClick={(e) => setRecurence(e.target.value)}/>
                    <br></br>
                    <input className="recurence" type="button" value="Hebdomadaire" onClick={(e) => setRecurence(e.target.value)}/>
                    <br></br>
                    <input className="recurence" type="button" value="Mensuel" onClick={(e) => setRecurence(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <label>Type d'objectif</label>
                    <br></br>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option>Sportif</option>
                        <option>Alimentaire</option>
                        <option>Intellectuel</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label>Objectif Privé :</label>
                    <br></br>
                    <label className="switch">
                    <input type="checkbox" onChange={(e) => setOnProfile(e.target.value)}/>
                    <span></span></label>
                    <br></br>
                    <br></br>
                    <label>Description de l'objectif : </label>
                    <br></br>
                    <input type="text" className="descriptionObjectif" onChange={(e) => setDescription(e.target.value)}/>
                    <br></br>
                </form>
                <button onClick={() => {send()}} className="button_submit">Valider</button>
            </div>
    )
};

export default NouvelObjectif