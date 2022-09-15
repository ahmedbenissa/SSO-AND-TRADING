import Keycloak from "keycloak-js";
const keycloakconfig = new Keycloak({
 url: "http://localhost:8185/",
 realm: "RealmReact",
 clientId: "react",
});
console.log(keycloakconfig)
export default keycloakconfig;