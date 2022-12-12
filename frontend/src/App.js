import React from 'react';
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

const App = () => {
  let connecte = false

  if (document.cookie !== "") {
    connecte = true
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
            <Route path="/objectifs" element={connecte ? <Objectifs /> : <Navigate to="/inscription" />} className="objectifs" />
            {/* page par défault  */}
            <Route path="*" element={<Default />} />
            <Route path="/profil" element={connecte ? <Profil /> : <Navigate to="/inscription" />} />
            <Route path="/inscription" element={<Page_compte />} />
            <Route path="/carte" element={connecte ? <Carte /> : <Navigate to="/inscription" />} />
            <Route path='/nouvel_objectif' element={connecte ? <NouvelObjectif /> : <Navigate to="/inscription" />} />
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
