import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../styles/ville.css"

const Ville = () => {
    // ============================================================ CONSTANTES ============================================================
    const [nouvelle_ville, setNouvelleVille] = useState("");
    const [villes, setVilles] = useState([]);
    // const [villeUser, setVilleUser] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState("");
    const [objectifs, setObjectifs] = useState("");
    const [city, setCity] = useState("");
    const [id, setId] = useState("");
    let idSession = ""

    let donnees_a_jour = {
        "username": username,
        "email": email,
        "password": password,
        "confirmed": confirmed,
        "objectifs": objectifs,
        "city": city
    }


    useEffect(() => {
        axios.get("http://localhost:3001/ville/commune").then(response => {
            let array = [];
            for (let i = 0; i < response.data[0].Villes.length; i++) {
                array.push(response.data[0].Villes[i])
                setVilles(array)
            }
            array = array.sort()
        });
        axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
            axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId (response.data.idUser)
                axios.get(`http://localhost:3001/user/${response.data.idUser}`, { params: { "id": response.data.idUser } }).then(res => {
                    setUsername(res.data.username)
                    setEmail(res.data.email)
                    setPassword(res.data.password)
                    setObjectifs(res.data.objectifs)
                    setConfirmed(res.data.confirmed)
                    setCity(res.data.city)
                })
            })
        })
    }, [])

    const validation = async (e) => {
        donnees_a_jour = {
            "username": username,
            "email": email,
            "password": password,
            "confirmed": confirmed,
            "objectifs": objectifs,
            "city": city
        }

        axios
            .put(`http://localhost:3001/user/${id}`, donnees_a_jour)
            .then(response => {
                if (response.status === 201) {
                    alert("Profil modifié")
                } else {
                    alert("Une erreur à eu lieu lors de la modification du profil")
                }
            })
    }




    const variables = async (e) => {
        if (nouvelle_ville === "") {
            alert("Veuillez entrez un nom de ville valide")
        } else {

        }
    };


    // ============================================================ RENVOIE LA PAGE HTML ============================================================
    return (
        <div>
            <br />
            <label>Votre Ville : </label>
            <select value={city} onChange={e => setCity(e.target.value)}>
                <option>Veuillez séléctionnez votre ville</option>
                {villes.map((Villes) => (
                    <option key={Villes}>{Villes}</option>
                ))}
            </select>
            <br />
            <br />
            <div className='button_validation'>
                <label onClick={validation}>
                    Modifier mon profil
                </label>
            </div>
        </div>
    );
};

export default Ville;