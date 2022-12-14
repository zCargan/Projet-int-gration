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
    const [share, setShare] = useState("");

    
    let id = document.cookie.split("=")[1];

    const send = async(e) => {
        e.preventDefault();

        let ArrayObjectifs = []

        let dataUser = {
            "name" : titre,
            "description" : description,
            "type" : type,
            "frequence" : recurence,
            "onProfile" : onProfile,
            "share" : share

        }


        const dataObjectif = {
            "type" : type,
            "objectif" : titre,
        }        

        if(dataUser.share){
            await axios.post("http://localhost:3001/objectif/",
            dataObjectif
            )
            .catch(err => console.warn(err));
        }

        

        

        await axios.get(`http://localhost:3001/user/${id}`, {params : {"id" : document.cookie}}).then(res => {
            for (let i = 0; i < res.data.objectifs.length; i++){
                ArrayObjectifs.push(res.data.objectifs[i])
            }
        
           ArrayObjectifs.push(dataUser)


            let jsonToSend = {"id" : id, "objectifs" : ArrayObjectifs}

            axios.post('http://localhost:3001/user/objectif',jsonToSend)
            .catch(err => console.warn(err));
        })
        .catch(err => console.warn(err));


        
        window.location.reload(false);
        
    }

    return(
        <div className="nouvelObjectif">
            <form onSubmit={send}>
                    <h2>Créer un objectif : </h2>
                    <label>Titre de l'objectif : </label>
                    <br></br>
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
                    <label>Rendre l'objectif privé ? </label>
                    <br></br>
                    <br></br>
                    <label className="switch">
                    <input type="checkbox" onChange={(e) => setOnProfile(e.target.value)}/>
                    <span></span></label>
                    <br></br>
                    <br></br>
                    <label>Partager l'objectif a tout le monde ? </label>
                    <br></br>
                    <br></br>
                    <label className="switch">
                    <input type="checkbox" onChange={(e) => setShare(e.target.value)}/>
                    <span></span></label>
                    <br></br>
                    <br></br>
                    <label>Description de l'objectif : </label>
                    <br></br>
                    <input type="text" className="descriptionObjectif" onChange={(e) => setDescription(e.target.value)}/>
                    <br></br>
                    <button type="submit" className="button_submit">Valider</button>
                </form>
            </div>
    )
};

export default NouvelObjectif