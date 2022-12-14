import React, { useState } from 'react';
import { layer, Map, Layers } from "react-openlayers"
import "../styles/map.css"
import Localisation from '../components/Localisation';
import axios from 'axios';


const Carte = () => {

    const LouvainLaNeuveLonLat = [513525, 6562800];
    const LouvainLaNeuveZoom = 15;
    const [position0, setPosition0] = useState([0, 0]);
    const [zoom0, setZoom0] = useState(1);
    const [city, setCity] = useState("");
    const location = Localisation;
    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");
    let idSession = ""
    function LouvainLaNeuve() {
        setPosition0(LouvainLaNeuveLonLat)
        setZoom0(LouvainLaNeuveZoom)
    }
    axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
        idSession=res.data.Id
        axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
            setId (response.data.idUser)
        })
    })
    axios.get(`http://localhost:3001/user/${id}`, { params: { "id": id } }).then(res => {
        setCity(res.data.city)
    })

    const chercher = async (e) => {
        axios.post('http://localhost:3001/user/find', { "city": city }).then(response => {
            const array_user = [];
            for (let i = 0; i < response.data.length; i++) {

                if (response.data[i]._id!==id){
                    array_user.push(response.data[i].username);
                }
            }
            setUsers(array_user)
        });
    }


    return (
        <div>
            <div>
                <h1>
                    Trouver des gens prêt de chez vous !
                </h1>
            </div>
            <div>
                <h2>
                    Votre ville : {city}
                </h2>
            </div>
            <br />
            <div className='map'>
                <Map view={{ center: position0, zoom: zoom0 }}>
                    <Layers>
                        <layer.Tile>

                        </layer.Tile>
                    </Layers>
                </Map>
            </div>
            <br />
            <div>
                <button className="button" onClick={(e) => LouvainLaNeuve()}> Centrer sur Louvain La Neuve </button>
            </div>
            <br />
            <div className='find_user'>
                <br></br>
                <div>
                    <label className="button" onClick={chercher}>Trouver des gens prêt de chez moi</label>
                </div>
                <br />
                <div>
                    <label> Utilisateur prêt de chez vous :</label>
                    <br />
                    <br />
                    {users.map((user, n) => (
                        <div    key={n}>
                            <h4>Utilisateur {n + 1}: {user} </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carte;