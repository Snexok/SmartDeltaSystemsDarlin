import { useEffect } from "react";

export const Login = () => {
    useEffect( () => {
        window.location.replace( "http://localhost:8081/oauth2/authorization/github" );
    }, [] );

    return <></>
}
