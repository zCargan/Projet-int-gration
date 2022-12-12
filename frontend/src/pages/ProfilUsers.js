import React from "react";
import { useLocation } from "react-router-dom";
import BoutonFollow from "../components/BoutonFollow";
import "../styles/profilUser.css"

function ProfilUser(){

    const userId = useLocation();

    return(
        <div className="all">
            <div className='profilHeader'>
                <p className="userName">{userId.state.username}</p>
                <p className='city'>{userId.state.city}</p>
                <BoutonFollow />
            </div>
            <div className='profilFooter'>
            <p className="obj">Objectifs :</p>
                <ul className="listeObj">
                {userId.state.objectifs.map((objectif) =>
                    <li key={objectif._id} className="objectifsUser"><p className="titre-objectifs">{objectif.name}</p></li>
                )}
                </ul>
            </div>
        </div>
    )
}

export default ProfilUser;
