import React, {useEffect,useState } from 'react';
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
import Fil_actualite from "./pages/fil_d'actu"
import './styles/App.css'
import NouvelObjectif from './components/NouvelObjectif';
import ProfilUser from './pages/ProfilUsers';
import BarreRecherche from './components/BarreDeRecherche'
import axios from 'axios'

const App = () => {
  const [connecte, setConnecte] = useState(false);
  const [id, setId] = useState("");
  let idSession = ""
  axios.get('http://localhost:3001/getcookie', { withCredentials: true }).then(res => {
    idSession=res.data.Id
    if (typeof(idSession) !== "string"){
      console.log("pas connecté")
    }
    else{
      axios.get(`http://localhost:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
        if (response.data === null){
          console.log("pas connecté")
      }
      else{
          setId (response.data.idUser)
          setConnecte(true)
      }
    })
    }
  })

  function requireAuth(nextState, replace, next) {
    if (!connecte) {
      replace({
        pathname: "/inscription",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }
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
            <Route path="/objectifs" onEnter={requireAuth} element={<Objectifs/>} />
            {/* page par défault  */}
            <Route path="*" element={<Default />} />
            <Route path="/profil" onEnter={requireAuth} element={<Profil/>}/>
            <Route path="/inscription" element={<Page_compte />} />
            <Route path="/carte" onEnter={requireAuth} element={<Carte/>} />
            <Route path='/nouvel_objectif' onEnter={requireAuth} element={<NouvelObjectif/>} />
            <Route path='/rgpd' element={<Rgpd />} />
            <Route path='/profilUser' element={<ProfilUser />} />
            <Route path="/modifierObjectif" element={<ModifierObjectif/>}/>
            <Route path="/fil_actualite" element={<Fil_actualite/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
