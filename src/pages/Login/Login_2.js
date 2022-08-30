import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { login } from "../../services/auth";
import './Login.css';

import  imgLogin from '../../Imagenes/InicioSesion_Copia3.png'

// Se esta usando este backend https://reqres.in/ , en la entada del POST:  LOGIN - SUCCESSFUL
// Para loguearse usamos estas credendiales
// {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
// }
// Si uso el Backend de Juli: es el link: https://back-sandbox.herokuapp.com/api/auth/login
// Para loguearse usamos estas credendiales
// {
//     "email": "facu1@gmail.com",
//     "password": "pass12345"
// }



alert ("Componente Login_2: ejecucion Previa")

const Login = () => {

    // alert ("Componente Login_2: 1 - Inicio Ejecución interior del componente Login = ()")

    //Esto que estaba compleo lo saco al Fectch
    // const apiCall = async () => {
    //     try 
    //     } catch
    // }
    // alert ("Longin.js: Componente Login: ejecucion en Renderizacion componenete propiamente dicha. (se ejecutará con cada cambio de estado)")

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //07/02/22 intento dejar de usar mi estados y meter todo sin estado como lo hace Juli.
    // estados definidos por mi
    // const [msgError, setMsgError] = useState('');
    // const [token, setToken] = useState('');

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

    const onClickSubmit = async () => {
        alert ("Paso por el onClickSubmit antes del apiCall().");
        await apiCall()
        alert ("Paso por el onClickSubmit: El token es: " + data.token);
        alert ("Paso por el onClickSubmit y el error es: " + error);
       
        if (error) {
            // setMsgError(error);
            // setToken('');
            alert("Longin.js: paso por el Si: tiene error, y el error es: " + error)
            console.log ("Longin.js: paso por el Si: tiene error, y el error es: " + error)

        } else {
            // setMsgError('');
            // setToken(data.token);
            alert("Longin.js: paso por el else: no tiene error, y el token es: " + data.token + "  Guardo token y el storage")
            console.log("Longin.js: paso por el else: no tiene error, y el token es: " + data.token + "  Guardo token y el storage")
                //Guardo datos del usuario:  --> chequear el local storage
                 localStorage.setItem('emailUsuario', email)
                 localStorage.setItem('token', data.token);
                 window.location.replace("/home");  
        }

    }

    // hay un problema de foco que no deja hacer click en los campos de Loguin --> raro --> chineandola: click en la barra de dirección
    //      y luego en los campos loguin
    //  Falta averigaur como manejo el foco en react
    //  Falta ver xq el loguin esta andando mal  ==> como que loguea 2 veces y el toke que guarda en el storage es distinto 
    //      al que tiene el backend como ultimo, o algo asi.
    // //Pongo foco el eamil
    // email.focus()

    return (
        // <div style={{ marginTop:"7%" }}>
        //     <h1>Bienvenido al Login </h1>
        //     <h2>Ingrese su email y contraseña:</h2>
        //     <input placeholder="Email" value={email} onChange={handleEmailChange} />
        //     <input placeholder='Password' value= {password} onChange={handlePasswordChange} />
        //     <p style={{color: 'red' }}> {msgError} </p>
        //     {/* <p style={{color: 'red' }}> {error} </p> */}
        //     <button disabled={loading} onClick={onClickSubmit}>Submit</button>
        //     {/* <button disabled={loading} onClick={apiCall}>Submit</button> */}
        //     {/* <p>El Token es: {data?.token}</p> */}
        //     <p>El Token es: {token}</p>
        // </div>

        <div className="Portada_Login">
            <div className="Card_Login">
                <div className="ImagenUsuario">
                    <img src={imgLogin} alt="Inicio de Sesion"/>
                </div>
                <div className="IniciarSesion">
                    <p>Iniciar Sesión</p>
                </div>
                <div className= "Etiquetas">
                    <input className="CamposEntrada" placeholder="Email" onChange={handleEmailChange} value={email} type="email" />
                </div>
                <div className= "Etiquetas">
                    <input className="CamposEntrada CampoEntradaPass"  placeholder="Password" onChange={handlePasswordChange} value={password}  type="password" />
                </div>
                
                <p className= "pError" style={{color: 'red' }}> Error: {error}  </p>

                <div className= "Etiquetas" tabIndex="-1">
                    <a className="AHref_submit"  tabIndex="-1">  
                        <button className="Submit" disabled={loading} onClick={onClickSubmit} > <ins>E</ins>ntrar</button>  
                    </a>
                </div>
                <div className= "Etiquetas" tabIndex="-1">
                    {/* <a className="AHref_submit" href="../../index.html" tabIndex="-1">   */}
                    <a className="AHref_submit" href="../../index.html" tabIndex="-1">  
                        <button className="CancelarBtn"> <ins>C</ins>ancelar</button>
                    </a>
                </div>

                {/* <p className="pToken" >El Token es: {token}</p> */}
                <p className="pToken" >El Token es: {data?.token}</p>

                <div className= "Etiquetas" tabIndex="-1">
                    {/* <!-- <a className="AHref_submit" href="" tabIndex="-1"> --> */}
                        <button id="btnOlvidePass" className="OlvidePass"> <ins>O</ins>lvidé mi password</button>
                    {/* <!-- </a> --> */}
                </div>
                <div className= "Etiquetas" tabIndex="-1">
                    {/* <!-- por cada '../'' subo un nivel de carpeta --> */}
                    {/* <a className="AHref_submit" href="../Register/register.html" tabIndex="-1">   */}
                        <button className="OlvidePass"> C<ins>r</ins>ear una cuenta</button>
                    {/* </a>  */}
                </div>  
            </div>
        </div>
    )
}

export default Login
