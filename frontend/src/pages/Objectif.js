import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/objectif.css'
import { useNavigate } from 'react-router-dom';

function Objectif  (objectif_name)  {
    const [name, setName] = useState("");
    const [frequence, setFrequence] = useState("");
    const [prive, setPrive] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [clique, setClique] =useState("")

    useEffect(() => {
        objectif_name = "Aller courir"

        let id = "635ba113935a45c92d42fe3d";
        axios.get(`http://localhost:3001/user/${id}`, { params: { "id": id } }).then(res => {
            for (let i=0 ; i < res.data.objectifs.length;i++){
                if (res.data.objectifs[i].name==objectif_name){
                    setName(res.data.objectifs[i].name)
                    setFrequence(res.data.objectifs[i].frequence)
                    setPrive(res.data.objectifs[i].prive)
                    i= res.data.objectifs.length
                }
            }

        })
        axios.get(`http://localhost:3001/objectif/${objectif_name}`,{ params: { "name": objectif_name } }).then(res => {
            setDescription(res.data.description)
            setType(res.data.type)
        }).catch(err => console.log(err));
        console.log(name)
        console.log(frequence)
        console.log(prive)
        console.log(description)
        console.log(type)

    }, []);

    function truc(){
        setClique(!clique)
        console.log(!clique)
    }
    if (clique){
        return(
            <div>
                <form className='form'>
                    <label>Nom</label>
                    <input type="text" value={name}></input>
                    <label>Type</label>
                    <input type="text" value={type}></input>
                    <label>Description</label>
                    <input type="text" value={description}></input>
                    <label>Frequence</label>
                    <input type="text" value={frequence}></input>
                    <label>Privé</label>
                    <input type="text" value={prive}></input>
                    <button onClick={() => {truc();}}>Valider</button>
                </form> 
            </div>
        );
    }
    else{
        return (

            <div className='form'>
                <a>Nom </a>{name}
                <br></br>
                <a>Type </a>{type}
                <br></br>
                <a>Description </a>{description}
                <br></br>
                <a>Fréquence </a>{frequence}
                <br></br>
                <a>Privé </a>{prive}
                <br></br>
                <button onClick={() => {truc();}}>Modifier</button>
            </div>
        );
    }
    
}
export default Objectif;