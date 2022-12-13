import React from 'react'
import "../styles/default.css"
import RGPD from '../components/RGPD';


const Default = () => {
    return (
        <div className='div_global'>
            <div>
                <p className='bienvenue_text'>
                    NEWME
                </p>
            </div>
            <div>
                <p>
                    NewMe est un projet étudiant dans le cadre d'un cours.

                    Nous avons voulu pousser la communauté 
                </p>
            </div>
            
            <div>
                <RGPD />
            </div>
        </div >
    )
}

export default Default;