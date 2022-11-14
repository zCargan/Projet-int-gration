import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About';
import Objectifs from './pages/Objectifs';
import Page_compte from './pages/Page_compte';
import Navbar from './components/navbar';
import Default from './pages/default';
import Profil from './pages/Profil';
import Carte from './pages/Carte';
import Rgpd from './pages/Rgpd'
import ModifierObjectif from './pages/ModifierObjectif';
import NouvelObjectif from './pages/NouvelObjectif';
import './styles/App.css'
import NouvelObjectif from './components/NouvelObjectif';
import ProfilUser from './pages/ProfilUsers';
import About_Us from './pages/About_us';
import BarreRecherche from './components/BarreDeRecherche'
import axios from 'axios'

const App = () => {
  const [connecte, setConnecte] = useState(false);
  const [id, setId] = useState("");

  axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
    let idSession = res.data.Id;
    if (typeof (idSession) !== "string") {
      console.log("pas connecté")
      setConnecte(false)
    }
    else {
      axios.get(`http://localhost:3001/session/${idSession}`, { params: { "id": idSession } }).then(response => {
        if (response.data === null) {
          console.log("pas connecté")
          setConnecte(false)
        }
        else {
          setId(response.data.idUser)
          setConnecte(true)
        }
      })
    }
  })
  console.log(connecte)
  if (connecte) {
    return (
      <div className="page">
        <BrowserRouter>
          <div className="element">
            <Navbar className="navbar" />
          </div>
          <div className="element">
            <Routes>
              <Route path="/" element={<Default />} />
              <Route path="/about" element={<About />} />
              <Route path="/objectifs" element={<Objectifs />} />
              {/* page par défault  */}
              <Route path="*" element={<Default />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/inscription" element={<Page_compte />} />
              <Route path="/carte" element={<Carte />} />
              <Route path='/nouvel_objectif' element={<NouvelObjectif />} />
              <Route path='/rgpd' element={<Rgpd />} />
              <Route path='/profilUser' element={<ProfilUser />} />
              <Route path="/modifierObjectif" element={<ModifierObjectif />} />
              <Route path="/fil_actualite" element={<Fil_actualite />} />
              <Route path="/about_us" element={<About_Us />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return (
      <div className="page">
        <BrowserRouter>
          <div className="element">
            <Navbar className="navbar" />
          </div>
          <div className="element">
            <Routes>
              <Route path="/" element={<Default />} />
              <Route path="/about" element={<About />} />
              <Route path="/objectifs" element={<Page_compte />} />
              {/* page par défault  */}
              <Route path="*" element={<Default />} />
              <Route path="/profil" element={<Page_compte />} />
              <Route path="/inscription" element={<Page_compte />} />
              <Route path="/carte" element={<Page_compte />} />
              <Route path='/nouvel_objectif' element={<Page_compte />} />
              <Route path='/rgpd' element={<Rgpd />} />
              <Route path='/profilUser' element={<Page_compte />} />
              <Route path="/modifierObjectif" element={<Page_compte />} />
              <Route path="/fil_actualite" element={<Page_compte />} />
              <Route path="/about_us" element={<About_Us />} />

  return (
    <div className="page">
      <BrowserRouter>
        <div className="element">
          <Navbar className="navbar" />
        </div>
        <div className="element">
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/objectifs" element={<Objectifs />} className="objectifs" />
            {/* page par défault  */}
            <Route path="*" element={<Default />} />
            <Route path="/profil" element={connecte ? <Profil /> : <Navigate to="/inscription" />} />
            <Route path="/inscription" element={<Page_compte />} />
            <Route path="/carte" element={connecte ? <Carte /> : <Navigate to="/inscription" />} />
            <Route path='/nouvel_objectif' element={connecte ? <NouvelObjectif /> : <Navigate to="/inscription" />} />
            <Route path='/rgpd' element={<Rgpd />} />
            <Route path='/profilUser' element={<ProfilUser />} />
            <Route path="/modifierObjectif" element={<ModifierObjectif/>}/>
            <Route path="/profil" element={<Profil />} />
            <Route path="/inscription" element={<Page_compte />} />
            <Route path="/carte" element={<Carte />} />
            <Route path="/profilUser" element={<ProfilUsers />} />
            <Route path='/nouvel_objectif' element={<NouvelObjectif />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
