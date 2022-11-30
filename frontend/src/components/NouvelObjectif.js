import React, { useState ,useEffect} from 'react';
import "../styles/App.css"
import axios from 'axios'

const NouvelObjectif = () => {

    const [titreobj, setTitreobj] = useState("");
    const [descriptionobj, setDescriptionobj] = useState("");
    const [recurence, setRecurence] = useState("");
    const [type, setType] = useState("");


    const send = async (e) => {
        e.preventDefault();
    }

    return(
        <form onSubmit={send}>
                <h2>Créer un objetif : </h2>
                <label>Titre de l'objectif : </label>
                <input type="text" className="titreObjectif" onChange={(e) => setTitreobj(e.target.value)}/>
                <br></br>
                <br></br>
                <label>Récurence :  </label>
                <br></br>
                <input className="recurence" type="button" value="Journalier" onClick={(e) => setRecurence(e.target.value)}/>
                <br></br>
                <input className="recurence" type="button" value="Hebdomadaire" onClick={(e) => setRecurence(e.target.value)}/>
                <br></br>
                <input className="recurence" type="button" value="Mensuel" onClick={(e) => setRecurence(e.target.value)}/>
                <br></br>
                <br></br>
                <label>Tpe d'objectif</label>
                <br></br>
                <select id="type">
                    <option value="Sportif">Sportif</option>
                    <option value="Alimentaire" selected>Alimentaire</option>
                    <option value="Intelectuel">Intellectuel</option>
                </select>
                <br></br>
                <br></br>
                <label>Objectif Privé :</label>
                <br></br>
                <label class="switch">
                <input type="checkbox" />
                <span></span></label>
                <br></br>
                <br></br>
                <label>Déscription de l'objectif : </label>
                <input type="text" className="descriptionObjectif" onChange={(e) => setDescriptionobj(e.target.value)}/>
                <br></br>
                <input type="submit" className="button_submit" value="Valider"/>
            </form>
    )
};

export default NouvelObjectif
