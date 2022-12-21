import React, { useEffect, useState , useLayoutEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import '../styles/boutonfollow.css';



function ButtonFollow (params){


    
    const userId = useLocation();
    const [bouton, setBouton] = useState()
    const [newUsersFollows, setData] = useState([]);
    const [connecte, setConnecte] = useState(false);
    const [id, setId] = useState("");
    let idSession = ""
   
    useEffect(() => {
        axios.get('https://www.newme.ovh:3001/getcookie', { withCredentials: true }).then(res => {
            idSession=res.data.Id
              axios.get(`https://www.newme.ovh:3001/session/${idSession}`,{ params: { "id": idSession }}).then(response => {
                setId (response.data.idUser)
                axios.get(`https://www.newme.ovh:3001/user/${id}`).then(res => {
                   setData(res.data.userfollows)
                   
                    if(newUsersFollows.includes(userId.state._id)){
                        setBouton(false);
                    }
                    else{
                        setBouton(true);
                    };
            })
          })


        }).catch(err => console.log(err));
    }, [bouton])
    
    

    function suivreFollow(){
        if( newUsersFollows.includes(userId.state._id) ){
            newUsersFollows.splice(newUsersFollows.indexOf(userId.state._id),1)
            axios.put(`https://www.newme.ovh:3001/user/${id}`, {userfollows : newUsersFollows}).then(alert("Utilisateur retiré"))
            setBouton(true)
        }
        else {
            newUsersFollows.push(userId.state._id);
            axios.put(`https://www.newme.ovh:3001/user/follow/${id}`, { userfollows : newUsersFollows }).then(alert("Utilisateur suivi!"))
            setBouton(false)
        }

    };




    return(
        <div>
            <button className='boutonFollow' onClick={suivreFollow}>{bouton ? 'Suivre' : 'Ne plus suivre'}</button>
        </div>
        )
    

        

}

export default ButtonFollow;

