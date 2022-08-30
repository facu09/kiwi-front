import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { login } from "../../services/auth";


const Login = () => {

    //Esto que estaba compleo lo saco al auth.js
    // const apiCall = async () => {
    //     try 
    //     } catch
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // estados definidos por mi
    const [msgError, setMsgError] = useState('');
    const [token, setToken] = useState('');

    
    // const [estoEsElDato, EstoEsElError, EstoEsElLoding] = useFetch()  //en generico esto: por si tengo que usar mas de 1
     const [data, error, loading, apiCall] = useFetch({
        service: () => login({ email, password }),
        globalLoader: true
     });

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onClickSubmit = () => {
        
        apiCall()
        alert ("Paso por el onClickSubmit y el error es: " + error);
        alert ("El token es: " + data.token);
        if (error) {
            setMsgError(error);
            setToken('');
            alert("paso por el Si: tiene error, y el error es: " + error)
        } else {
            setMsgError('');
            setToken(data.token);
            alert("paso por el else: no tiene error, y el token es: " + data.token)
        }

    }

    return (
        <div style={{ marginTop:"7%" }}>
            <h1>Bienvenido al Login </h1>
            <h2>Ingrese su email y contraseña:</h2>
            <input placeholder="Email" value={email} onChange={handleEmailChange} />
            <input placeholder='Password' value= {password} onChange={handlePasswordChange} />
            <p style={{color: 'red' }}> {msgError} </p>
            {/* <p style={{color: 'red' }}> {error} </p> */}
            <button disabled={loading} onClick={onClickSubmit}>Submit</button>
            {/* <button disabled={loading} onClick={apiCall}>Submit</button> */}
            {/* <p>El Token es: {data?.token}</p> */}
            <p>El Token es: {token}</p>
            
        </div>
    )
}

export default Login
