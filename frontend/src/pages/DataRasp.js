import React from "react";
import Affichage from "../components/AffichageRasp";
import '../styles/affichageRasp.css'
import Fichier from './../components/Donnees'

function montreConnectée(){
    return(
        <div>
            <Fichier/>
            <p className="titre-acti">Vos activités : </p>
            <p className="affichage-donnée"><Affichage/></p>
        </div>
    )  
    
}

export default montreConnectée;