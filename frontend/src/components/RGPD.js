import React from 'react';
import { Navigate } from 'react-router-dom';
import "../styles/rgpd.css"
import { useNavigate } from 'react-router-dom'

const RGPD = () => {

    const navigate = useNavigate();

    const navigateToRGPD = () => {
        // 👇️ navigate to /inscription
        navigate('/rgpd');
    };

    return (
        <div>
            <div>
                <p className='text_rgpd' onClick={() => navigateToRGPD()} >
                    Mention légale et RGPD
                </p>
            </div>
        </div>
    );
};

export default RGPD;