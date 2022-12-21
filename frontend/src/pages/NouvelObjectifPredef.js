import React, { useState ,useEffect} from 'react';
import "../styles/App.css"
import axios from 'axios'
import "../styles/nouvelObjectif.css"
import {useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


function NouvelObjectifPredef(){

    //setters permetant de récuperer les données présentes dans e formulaire
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [recurence, setRecurence] = useState("Journalier");
    const [type, setType] = useState("Bien être");
    const [onProfile, setOnProfile] = useState("on");
    const [share, setShare] = useState("");
    const [id, setId] = useState("");
    const location = useLocation();
    let objectif_name = location.state.name

    const navigate = useNavigate()

    const navigateToProfil = () => {
        //  navigate to /profil
        navigate('/Profil');
      };

    const navigateToInscription = () => {
        navigate('/inscription');
      };
   
    let idSession

    let ArrayObjectifs = []


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
                            setTitre(objectif_name)
                            setId (response.data.idUser)
                        }
                  })
                }
        })
    });

    //la fct send s'effectue a lenvoi du formulaire 
    const send = async(e) => {
        e.preventDefault();

        
        //les données a envoyer vers la partie user
        let dataUser = {
            "name" : titre,
            "description" : description,
            "type" : type,
            "frequence" : recurence,
            "onProfile" : onProfile,
            "share" : share

        }

        //les données a envoyer vers la partie objectif
        const dataObjectif = {
            "type" : type,
            "objectif" : titre,
        }        

        //envoi les données vers la partie objectif suelement si l'utilisateur a coché cette option
        if(dataUser.share){
            await axios.post("http://localhost:3001/objectif/",
            dataObjectif
            )
            .catch(err => console.warn(err));
        }

        

        
        //envoi des données vers la partie user 
        await axios.get(`http://localhost:3001/user/${id}`, {params : {"id" : document.cookie}}).then(res => {
            for (let i = 0; i < res.data.objectifs.length; i++){
                if(res.data.objectifs[i].name === titre) {
                    alert("L'objectif choisi a déjà été ajouté !")
                } else {
                    ArrayObjectifs.push(res.data.objectifs[i])
                }
            }
        
           ArrayObjectifs.push(dataUser)


            let jsonToSend = {"id" : id, "objectifs" : ArrayObjectifs}

            axios.post('http://localhost:3001/user/objectif',jsonToSend)
            .catch(err => console.warn(err));
        })
        .catch(err => console.warn(err));


        
        navigateToProfil();
        
    }

    //formulaire 
    return(
        <div className="nouvelObjectif">
            <form onSubmit={send}>
                    <h2>Créer un objectif : </h2>
                    <label>Titre de l'objectif : </label>
                    <br></br>
                    <input type="text" className="titreObjectif" required onChange={(e) => setTitre(e.target.value)} defaultValue={objectif_name}/>
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
                        <option>Bien être</option>
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
                    <label>Rendre l'objectif accesible à tout le monde ? </label>
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

export default NouvelObjectifPredef