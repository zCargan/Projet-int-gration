import React, { useState } from "react";
import { json } from "react-router-dom";
import axios from 'axios'

function Fichier() {
  const [file, setFile] = useState();
  let data
  const fileReader = new FileReader();
  let arrayHeureDebut = ""
  let arrayHeureFin = ""
  let time = 0
  let jsonDataToSend
  let vitesseMoyenne = 0
  let vitesseMax = 0
  let vitesseMin = 0
  let nombrePas = 0
  let battementsMoyen = 0
  let compteurBattements = 0
  let compteurVitesse = 0
  let dateDonnee

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    let csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    csvHeader[7] = csvHeader[7].split("\r")[0];
    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    data = array
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
      const headerKeys = Object.keys(data[0])
      arrayHeureDebut = data[0].Heure.split(":")
      arrayHeureFin = data[data.length-2].Heure.split(":")

      time = ((Number(arrayHeureFin[0]) * 60 * 60) + (Number(arrayHeureFin[1]) * 60) + (Number(arrayHeureFin[2]))) - ((Number(arrayHeureDebut[0] * 60 * 60)) + (Number(arrayHeureDebut[1] * 60)) + (Number(arrayHeureDebut[2])))
      let date = new Date(null);
      date.setSeconds(time);
      let duree = date.toISOString().substr(11, 8);

      for (let i = 0; i < data.length - 1; i++) {
        if (data[i]['Vitesse'] !== undefined && data[i]['Vitesse'] !== 'None') {
          vitesseMoyenne += parseFloat(data[i]['Vitesse'])
          compteurVitesse++
          if(data[i]['Vitesse'] > vitesseMax) {
            vitesseMax = parseFloat(data[i]['Vitesse'])
          } else if (data[i]['Vitesse'] < vitesseMin) {
            vitesseMin = parseFloat(data[i]['Vitesse'])
          }
        }
        if (data[i]['Nombre de pas'] !== undefined && data[i]['Nombre de pas'] !== 'None' && data[i]['Nombre de pas'] !== 'None\r' ){
          nombrePas += Number(data[i]['Nombre de pas'])
        } 
        if (data[i]['Frequence cardiaque'] !== undefined && data[i]['Frequence cardiaque'] !== 'None') {
          battementsMoyen += Number(data[i]['Frequence cardiaque'])
          compteurBattements++
        }
      }
    dateDonnee = data[0]['Date']
    battementsMoyen = battementsMoyen / compteurBattements
    vitesseMoyenne = vitesseMoyenne / compteurVitesse
    jsonDataToSend = {"Duree" : duree, "Vitesse" : vitesseMoyenne, "VitesseMax" : vitesseMax, "VitesseMin" : vitesseMin,"Pas" : nombrePas, "Battements" : battementsMoyen, "Date" : dateDonnee, "id" : "63OI"}
    
    axios.post("http://localhost:3001/donnees", jsonDataToSend).then(alert("Données envoyées avec succès !"))

    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}

export default Fichier