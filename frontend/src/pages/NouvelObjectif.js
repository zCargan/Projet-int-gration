import React, { useState ,useEffect} from 'react';
import "../styles/App.css"
import axios from 'axios'
import "../styles/nouvelObjectif.css"

const NouvelObjectif = () => {

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [recurence, setRecurence] = useState("");
    const [type, setType] = useState("");
    const [onProfile, setOnProfile] = useState("");


    const send = async (e) => {
        e.preventDefault();

        let ArrayObjectifs = []

        let id = document.cookie.split("=")[1];

        const dataObjectif = {
            "type" : type,
            "objectif" : titre,
        }

        // let dataUser = {
        //     "name" : titre,
        //     "description" : description,
        //     "frequence" : recurence,
        //     "onProfile" : onProfile,
        //     "share" : true

        // }

        // const dataToSend  = [id, dataUser];

        axios.post("http://localhost:3001/objectif/",
            dataObjectif
        )
        .catch(err => console.warn(err));

        // axios.get(`http://localhost:3001/user/${id}`).then(res => {
        //    ArrayObjectifs = res.data.objectifs
        //    ArrayObjectifs.push(dataUser)
        // })

        // axios.post('http://localhost:3001/user/objectif',
        //     dataToSend
        // )

        window.location.reload(false);
        
    }

    return(
        <div className="nouvelObjectif">
            <form onSubmit={send}>
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
                    <label>Déscription de l'objectif : </label>
                    <br></br>
                    <input type="text" className="descriptionObjectif" onChange={(e) => setDescription(e.target.value)}/>
                    <br></br>
                    <input type="submit" className="button_submit" value="Valider"/>
                </form>
            </div>
    )
};

export default NouvelObjectif