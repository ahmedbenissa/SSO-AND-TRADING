import React from 'react';
import keycloak from '../Keycloackconfig';
import { useKeycloak } from "@react-keycloak/web/lib/useKeycloak";
import { Toolbar } from '@mui/material';
import '../../src/App.css'
const Home = () => {
  //const { keycloak, initialized } = useKeycloak();
  console.log(keycloak)
 return (
   <div>
     <Toolbar className='NavBar'>
      <p className='NavBarText'> Home </p>
      <p className='NavBarText'> Contact </p>
      <p className= "NavBarText"> About Us</p>
      <p className='NavBarText'> See Roles </p>
     </Toolbar>
   </div>
 );
};

export default Home;