import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/modifierObjectif.css'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

function Objectif  ()  {
    const location = useLocation();
    const [name, setName] = useState("");
    const [frequence, setFrequence] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [clique, setClique] =useState("")
    const [shareBool, setShareBool] = useState(false)
    const [onProfileBool, setOnProfileBool] = useState(false)
    const [data, setData] = useState([])
    const [id, setId] = useState("");
    let idSession = ""
    let newObjectif = {}
    let jsonToSend = {}
    const navigate = useNavigate();
    let objectif_name = location.state.name
    const navigateToProfil = () => {
        navigate('/profil');
      };
    useEffect(() => {
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id   
              axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId(response.data.idUser)
                axios.get(`http://localhost:3001/user/${response.data.idUser}`, { params: { "id": response.data.idUser } }).then(res => {
                    for (let i=0 ; i < res.data.objectifs.length;i++){
                        if (res.data.objectifs[i].name===objectif_name){
                            setName(res.data.objectifs[i].name)
                            setFrequence(res.data.objectifs[i].frequence)
                            if (res.data.objectifs[i].onProfile){
                                setOnProfileBool(true)
                            }
                            if (res.data.objectifs[i].share ){
                                setShareBool(true)
                            }
                            setDescription(res.data.objectifs[i].description)
                            setType(res.data.objectifs[i].type)
                            i= res.data.objectifs.length
                        }
                    }

                })
                axios.get(`http://localhost:3001/user/${response.data.idUser}`).then(res => {
                    setData(res.data.objectifs)
                })
            })
          })
    }, []);

    function truc(){
        setClique(!clique)
    }

    function sendData (){
        let dataToSend =[]
        newObjectif = { "name":name,"description":description, "type":type, "frequence":frequence, "onProfile":onProfileBool, "share":shareBool }
        for (let i=0; i<data.length ;i++){
            if(data[i].name !== name){
                dataToSend.push(data[i])
            }
        }
        dataToSend.push(newObjectif)
        jsonToSend = {"id" : id, "objectifs" : dataToSend}
        axios.post(`http://localhost:3001/user/objectif`, jsonToSend)
        navigateToProfil()
     }
     function changeOnProfileBool(value){
        if (value === "true"){
            setOnProfileBool(true)
        }
        else{
            setOnProfileBool(false)
        }
     }
     function changeShareBool(value){
        if (value === "true"){
            setShareBool(true)
        }
        else{
            setShareBool(false)
        }
     }
      if (clique){
        return(
            <div>
                <form className='form'>
                    <label>Nom</label>
                    <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
                    <br></br>
                    <label>Type</label>
                    <input type="text" defaultValue={type} onChange={(e) => setType(e.target.value)}></input>
                    <br></br>
                    <label>Description</label>
                    <input type="text" defaultValue={description} onChange={(e) => setDescription(e.target.value)}></input>
                    <br></br>
                    <label>Frequence</label>
                    <select name="frequence" id="frequence" onChange={(e) => setFrequence(e.target.value)}>
                    <option value={frequence}>{frequence}</option>
                    <option value="Journalier">Journalier</option>
                    <option value="Hebdomadaire">Hebdomadaire</option>
                    <option value="Bimensuel">Bimensuel</option>
                    <option value="Mensuel">Mensuel</option>
                    </select>
                    <br></br>
                    <div onChange={(e) => changeOnProfileBool(e.target.value)}>
                    <label>Rendre L'objectif visible sur votre profil ? Oui</label>
                    <input type="radio" name="onProfile" defaultChecked={onProfileBool} value="true"></input>
                    <label>Non</label>
                    <input type="radio" name="onProfile" defaultChecked={!onProfileBool} value="false"></input>
                    </div>
                    <div onChange={(e) => changeShareBool(e.target.value)}>
                    <label>Partager votre objectif aux autres utilisateurs ? Oui</label>
                    <input type="radio" name="share" defaultChecked={shareBool} value="true"></input>
                    <label>Non</label>
                    <input type="radio" name="share" defaultChecked={!shareBool} value="false"></input>
                    </div>
                    <input type="button" className="button_form" value="Valider" onClick={sendData}/>
                    <br></br>
                    <button className="button_form" onClick={() => {truc();}}>Annuler</button>
                </form> 
            </div>
        );
    }
    else{
        return (

            <div className='form'>
                Nom : {name}
                <br></br>
                Type : {type}
                <br></br>
                Description : {description}
                <br></br>
                Fréquence : {frequence}
                <br></br>
                Afficher sur votre profil ? : {onProfileBool}
                <br></br>
                Partager avec les autres utilisateur : {shareBool}
                <br></br>
                <button onClick={() => {truc();}} className="button_form">Modifier</button>
                <br></br>
                <button onClick={() => {navigateToProfil();}} className="button_form">Annuler</button>
            </div>
        );
    }
    
}
export default Objectif;