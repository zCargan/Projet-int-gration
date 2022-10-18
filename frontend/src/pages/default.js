import React from 'react'
import "../styles/default.css"
import ReactPlayer from 'react-player'
import RGPD from '../components/RGPD';
import '../styles/default.css'
import React from 'react'
import BulleProfil from '../components/BulleProfil';


const Default = () => {

    return (
        <div className='div_global'>
            <div>
                <p className='bienvenue_text'>
                    Bienvenue sur la page d'accueil du site
                </p>
            </div>
            <BulleProfil />
        </div>
    );
};

export default Default;