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

    function LouvainLaNeuve() {
        setPosition0(LouvainLaNeuveLonLat)
        setZoom0(LouvainLaNeuveZoom)
    }

    let id = document.cookie.split("=")[1];
    axios.get(`http://localhost:3001/user/${id}`, { params: { "id": document.cookie } }).then(res => {
        setCity(res.data.city)
    })

    const chercher = async (e) => {
        axios.post('http://localhost:3001/user/find', { "city": city }).then(response => {
            const array_user = [];
            for (let i = 0; i < response.data.length; i++) {
                array_user.push(response.data[i].username);

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
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis impedit id incidunt recusandae tempora quas suscipit saepe temporibus? Recusandae expedita pariatur saepe quo amet distinctio inventore, tenetur eaque impedit officiis.
                </p>
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
                <button onClick={(e) => LouvainLaNeuve()}> Centrer sur Louvain La Neuve </button>
            </div>
            <br />
            <div className='find_user'>
                <div>
                    <label onClick={chercher}>Trouver des gens prêt de chez moi</label>
                </div>
                <br />
                <div>
                    <label> Utilisateur prêt de chez vous :</label>
                    <br />
                    <br />
                    {users.map((user, n) => (
                        <div>
                            <h4>Utilisateur {n + 1}: {user} </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carte;