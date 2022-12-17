import axios from "axios";
import React from "react";
import { useState } from "react";

function Affichage(){

    const [dataRasp, setDataRasp] = useState([]);


    function afficherMesDonnees(){
        axios.get('http://localhost:3001/donnees/all').then(res => {
            setDataRasp(res.data)
            console.log(dataRasp)
        }).catch(err => console.log(err));
    }

    return(
        <div>
            <p className="boutonAffichage"><button onClick={afficherMesDonnees}>Afficher mes données</button></p>
            {dataRasp.map((data) =>
            <div key={data._id} className='donnee'>
            <p>Date : {data.Date}</p>
            <p>Durée de l'effort : {data.Duree}</p>
            <p>Vitesse moyenne : {(data.Vitesse).toFixed(2)}</p>
            <p>Nombre de pas : {data.Pas}</p>
            <p>Battements de coeur moyen : {(data.Battements).toFixed(2)}</p>
            <p>Vitesse maximum : {data.VitesseMax}</p>
            <p>Vitesse minimum : {data.VitesseMin}</p>
            </div>
            )}
        </div>
    )
}

export default Affichage;