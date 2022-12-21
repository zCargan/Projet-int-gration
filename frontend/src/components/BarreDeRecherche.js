import React, { useState } from 'react';
import  axios  from 'axios';

import "../styles/barrederecherche.css"
import { useNavigate } from 'react-router-dom';




function BarreRecherche(){
     
    const [user, setUser]  = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    

    const recupData = () => {
        axios.get('https://www.newme.ovh:3001/user')
        .then(res => {
            setUser(res.data)

        })
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value

        recupData();
        const newFilter = user.filter((value) => {
            return value.username.toLowerCase().includes(searchWord.toLowerCase());
        });

        if(searchWord === ''){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }
    

    const versPageProfil = (data) =>{
        navigate('/profilUser', {state: data});
    }



    return(
        <div className='search' >
            <div className='searchInput'>
            <input type='text' placeholder='Chercher un utilisateur' data={user} onChange={handleFilter} data-testid='searchInput'></input>
            </div>
            {filteredData.length !== 0 && (
            <div className='dataResult' data-testid='dataResult'>
                {filteredData.slice(0, 10).map((value, key) => {
                    return <a className='dataItem' >
                            <p key={value.id} onClick={()=>{versPageProfil(value)}}>{value.username}</p>
                        </a>
                })}
            </div>
)}
        </div>
    )
}

export default BarreRecherche;