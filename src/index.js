import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloackconfig";
const root = ReactDOM.createRoot(document.getElementById('root'));
const initOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.origin + '/silent-check-sso.html',
  checkLoginIframe: true
}

root.render(
  
     <ReactKeycloakProvider initOptions={initOptions} authClient={keycloak}>
    <App />
    </ReactKeycloakProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
