import React, { useState ,useEffect} from 'react';
import "../styles/App.css"
import axios from 'axios'
export function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export function checkVoid(string) {
    if (Number.isInteger(string)){
        return "Ce n'est pas un string"
    }
    else{
        return string === ""
    }
}
const ModifierProfil = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [basePseudo, setBasePseudo] = useState("");
    const [baseEmail, setBaseEmail] = useState("");
    const [id, setId] = useState("");
    let idSession = ""
    useEffect(() => {
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
            axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId (response.data.idUser)
                axios.get(`http://localhost:3001/user/${response.data.idUser}`, {params: {"id" : response.data.idUser}}).then(res => {
                    setBasePseudo(res.data.username)
                    setBaseEmail(res.data.email)
                })
            })
        })

    }, []);
    const test = async (e) => {
        e.preventDefault();
        const infos = {
            id : id,
            username : pseudo,
            email : email
        }
            if(checkVoid(infos.username)){
                alert("Veuillez entrer votre Pseudo")
            }
            else if(checkVoid(infos.email)){
                alert("Veuillez entrer votre Email")
            }
            else{
                if(checkEmail(infos.email)){
                    axios.post('http://localhost:3001/updateUser', infos)
                    window.location.reload(false)
                }
                else{
                    alert("Email entré incorrect")
                }
            }
    }
    return(
             <form className="formulaireProfil" onSubmit={test}>
                <h2>Mon profil :</h2>
                <label>Pseudonyme :</label>
                <input type="text" className="username" onChange={(e) => setPseudo(e.target.value)} placeholder={basePseudo}/>
                <br></br>
                <label>Adresse email : </label>
                <input type="text" className="email" onChange={(e) => setEmail(e.target.value)} placeholder={baseEmail}/>
                <input type="submit" className="button_submit" value="Valider"/>
            </form>  
    )
};
export default ModifierProfil;