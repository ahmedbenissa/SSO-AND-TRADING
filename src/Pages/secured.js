
import { Toolbar } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web/lib/useKeycloak";
import { useEffect, useRef, useState } from "react";
import '../App.css'
import stockvideo from '../videoplayback.mp4'
import axios from 'axios'
import keycloakconfig from "../Keycloackconfig";

import '../App.css'

const Secured = () => {
  const { keycloak, initialized } = useKeycloak();
  const [roles,setroles]=useState([])
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };
  console.log(keycloakconfig.realmAccess.roles)
useEffect(()=>{
 
  setroles(keycloakconfig.realmAccess.roles)
  attemptPlay();

},[])
const videoEl = useRef(null);

 return (
   <div>
   
   
     <>
    
     {roles.length ==0 ?(
      <p>loading....</p>
     ):(<div>
      <video
          playsInline
          loop
          muted={true}           
          src={stockvideo}
          ref={videoEl}
          id="myVideo">
  </video>
  <h1 className="h1">Welcome to the Protected Page. {keycloak.tokenParsed.preferred_username}</h1>
 
  <br></br><br></br><br></br>
  <p>...........................................</p>
  {roles.filter(e=>e!='default-roles-realmreact').map(e=><div><div className="column"><div class='row'>
     
     <div class="flip-card" >
  <div class="flip-card-inner">
    <div class="flip-card-front">
     <p className="Text">{e}</p>
    </div>
    <div class="flip-card-back">
      <h1>Role Given</h1> 
      <button onClick={attemptPlay}></button>
     {e == 'Buy Stocks' ? (<a href="/stocks">  <p className="Text">{e}</p></a>):
      e == 'view stocks' ? (<a href='/stocks'>  <p className="Text">{e}</p></a>):(
        e == 'Sell Stocks' ? (<a href = '/Purshases'>  <p className="Text">{e}</p></a>):
          e == 'view sales' ? (<a href = '/Sales'>  <p className="Text">{e}</p></a> 
          )
        :(<p>{e}</p>)
     )}
    
    
    
    </div>
  </div>
</div>
</div>

</div>

      </div>)}
    
      </div>
     )}
     </>
   </div>
 );
};

export default Secured;