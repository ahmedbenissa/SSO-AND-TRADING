import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import keycloakconfig from "../Keycloackconfig";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import '../App.css'
import { useEffect } from "react";
import axios from "axios";

const Nav = () => {
 const { keycloak, initialized } = useKeycloak();
 const [Balance,setBalance]=useState("0")
  useEffect(()=>{
    if(keycloak.authenticated==true)
    {
      axios.get("stocks/wallet/"+keycloakconfig.tokenParsed.preferred_username).then((res)=>{
     setBalance(res.data)
      })
    }
    else {
      console.log("login please")
    }

  })
 //const styles=usestyles()
 return (
   <div>
    
            <Toolbar className='toolbar'>
             <h1 className="label">
               Keycloak React AUTH.
             
             </h1>
             <div className="v">
               <p>
                 <a className="v" href="/">
                   Home
                 </a>
               </p>
               <p>
                 <a className="v" href="/secured">
                   Secured Page
                 </a>
               </p>
             </div>
             
                 {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="button2"
                     onClick={() => {keycloak.login()
                  }
                    }
                   >
                     Login
                   </button>
                 )}

                 {!!keycloak.authenticated && (
                  <div>
                   <button
                     type="button"
                     className="button2"
                     onClick={() => keycloak.logout()
                    }
                   >
                     Logout 
                  
                   </button>
                   
                      </div>
                 )}
                 <br></br>
                 {!!keycloak.authenticated && (
                  <div className="display"><MonetizationOnOutlinedIcon className='icon2'></MonetizationOnOutlinedIcon>
                    <p className="label">{Balance}</p></div>
                 )}
                 
                 {!!keycloak.authenticated && (
                  <div className="display"><AccountCircleIcon className="icon2"></AccountCircleIcon> 
                    <p className="label">{keycloak.tokenParsed.preferred_username}</p></div>
                 )}
                
                  </Toolbar>
                
               </div>
              
             
          
 );
};

export default Nav;