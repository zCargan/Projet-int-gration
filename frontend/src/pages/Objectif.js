import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/objectif.css'
import { useNavigate } from 'react-router-dom';

function Objectif  (objectif_name)  {
    const [name, setName] = useState("");
    const [frequence, setFrequence] = useState("");
    const [onProfile, setOnProfile] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [clique, setClique] =useState("")
    const [share, setShare] = useState("")
    const [shareBool, setShareBool] = useState(false)
    const [onProfileBool, setOnProfileBool] = useState(false)
    const [data, setData] = useState([])
    let jsonToSend = {}
    const navigate = useNavigate();
    let id = "635ba113935a45c92d42fe3d";
    objectif_name = "Manger moins de viande"

    useEffect(() => {

        axios.get(`http://localhost:3001/user/${id}`, { params: { "id": id } }).then(res => {
            for (let i=0 ; i < res.data.objectifs.length;i++){
                if (res.data.objectifs[i].name===objectif_name){
                    setName(res.data.objectifs[i].name)
                    setFrequence(res.data.objectifs[i].frequence)
                    if (res.data.objectifs[i].onProfile){
                        setOnProfile("oui")
                        setOnProfileBool(true)
                    } else {
                        setOnProfile("non")
                    }
                    if (res.data.objectifs[i].share ){
                        setShare("oui")
                        setShareBool(true)
                    } else {
                        setShare("non")
                    }
                    // setOnProfile(res.data.objectifs[i].onProfile)
                    setDescription(res.data.objectifs[i].description)
                    setType(res.data.objectifs[i].type)
                    i= res.data.objectifs.length
                }
            }
        })
    }, []);

    function truc(){
        setClique(!clique)
    }

    function sendData (){
        axios.get(`http://localhost:3001/user/${id}`).then(res => {
           setData(res.data.objectifs)
        })
        let dataToSend =[]
        for (let i=0; i<data.length ;i++){
            if(data[i].name !== name){
                dataToSend.push(data[i])
            }
        }
        jsonToSend = {"type":type, "name":name,"description":description, "frequence":frequence, "onProfile":onProfile, "share":share }
        dataToSend.push(jsonToSend)
        axios.post(`http://localhost:3001/user/objectif`, dataToSend)
/*        navigateToHome()
 */    }

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/profil');
      };
      
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
                    <div onChange={(e) => setOnProfile(e.target.value)}>
                    <label>Rendre L'objectif visible sur votre profil ? Oui</label>
                    <input type="radio" name="onProfile" defaultChecked={onProfileBool} value="True"></input>
                    <label>Non</label>
                    <input type="radio" name="onProfile" defaultChecked={!onProfileBool} value="False"></input>
                    </div>
                    <div onChange={(e) => setShare(e.target.value)}>
                    <label>Partager votre objectif aux autres utilisateurs ? Oui</label>
                    <input type="radio" name="share" defaultChecked={shareBool} value="True"></input>
                    <label>Non</label>
                    <input type="radio" name="share" defaultChecked={!shareBool} value="False"></input>
                    </div>
                    <input type="button" className="button_submit" value="Valider" onClick={sendData}/>
                    <br></br>
                    <button className="button_submit" onClick={() => {truc();}}>Annuler</button>
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
                Afficher sur votre profil ? : {onProfile}
                <br></br>
                Partager avec les autres utilisateur : {share}
                <br></br>
                <button onClick={() => {truc();}} className="button_submit">Modifier</button>
            </div>
        );
    }
    
}
export default Objectif;