//Componente User: muestra datos de usuario en un formulario
//  Ahora con Fetch comun para recuperar los datos

import imgLogin from '../../Imagenes/InicioSesion_Copia3.png';
import './User.css';
import './mediaQUser.css'

import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom"

//Recupero los Datos del usuario que esta logueado (Le paso el token actual)
//   El BackEnd, con el token, va y busca el usuario que se logueo con ese token y devuelve sus datos personales
//   En el Postman de BackEnd de Juli:   
//     Link Postman web (obtenido a través del boton de share): 
//     https://go.postman.co/workspace/ApiTest~bd1d14dc-98c0-41ae-9a57-711d9ddcf18b/collection/17226216-3f17d7f1-e1bb-4b97-acea-0c1905c737e2
//     Link pasado por Juli:  https://www.getpostman.com/collections/77d0c1a7abe6a8e0f71e
//          La base Url deberia ser: https://back-sandbox.herokuapp.com/api

//  alert ("Componenete User: 0 - Ejecución Previa del User.js");
console.log("Componenete User: 0 - Ejecución Previa del User.js");

const User = () => {
    
    // alert ("Componente User 1: Inicio Ejecución interior del componente User = ()")
    console.log ("Componente User 1: Inicio Ejecución interior del componente User = ()")

    //Aprendizaje: para usar este navigate: este componente NavBar.js tiene que estar dentro del  <BrowserRouter>
    const navigate = useNavigate() //definicion para poder usar navigate

    //Defino estados necesarios
    const [token, setToken] = useState(null);
    // const [user, setUser] = useState(null);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [edad, setEdad] = useState('')
    const [id, setId] = useState('')
    
    // let lsName = 'PRUEBA'
    // let lsLastName = 'PRUEBA'
    // let lsEmail = 'PRUEBA'
    // let lsEdad = 28
    // let lsIdUsuario = '132412341234'

    const getUserInfo = async () => {

        console.log("Apenas entrando al getUserInfo las variables valen Edad.")

        try{
            const response = await fetch('https://back-sandbox.herokuapp.com/api/user', {
                method: 'get',
                headers: {
                    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDE0YTc2ZDk5YmM3MDM5NDU1OGU1OCIsImlhdCI6MTYzMDU1MDI4OH0.APYZUEhrg1OQeXcsOzWdEeqMpwkvIJ5yBqPe0IzI378"
                    Authorization: "Bearer " + token
                }
            });
            const json = await response.json();  // no se xque hay que usar await otra vez...per se ve que si

            console.log(json.data);  //El json.data es un objeto
            //setUser(json.data); /*no lo estaria usando es muy complejo, lo hago de a uno */
            console.log("Usando el json.data.Campo:  Edad: " + json.data.age + ", Email: " + json.data.email + ", Apellido: " + json.data.lastName + ", Name: " + json.data.name + ".");
            
            if (json.data) {
               setName(json.data.name);
               setLastName(json.data.lastName);
               setEmail(json.data.email);
               setEdad(json.data.age);
               setId(json.data.id);
               console.log("Ahora con variables Edad: " + edad + ", Email: " + email + ", Apellido: " + lastName + ", Name: " + name + " id: " + id + ".");
            }
           
        } catch ( error ) {

            alert('error del componente User.js: ' + error );

            // setUser(name= lsName, lastName = lsLastName, email = lsEmail, edad = lsEdad, id= lsIdUsuario);
            // alert ("lsName asignado por error: " + lsName)
            console.log("Saliendo por el Error Hardcodeado Edad: " + edad + ", Email: " + email + ", Apellido: " + lastName + ", Name: " + name + ".");
        }

        // // return (lsName, lsLastName, lsEmail, lsEdad, lsIdUsuario)
    }

    useEffect(() => {
        const lsToken = localStorage.getItem('token');
        // alert("Entrando en el useEffect de 1 sola vez" + lsToken)
        console.log("Entrando en el useEffect de 1 sola vez" + lsToken)

        if (lsToken) {
            setToken(lsToken);
            // alert("Componenete User: 0 - Ejecución Previa: El Token: " + lsToke)
            console.log("Componenete User: 0 - Ejecución Previa: El Token: " + lsToken)
        }
    }, []); 
    // con el ", [])": --> se va a ejecutar 1 sola vez al principio

    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, [token]); // cada vez que cambie el token se va a ejecutar traer los datos del Usuario

    // // const {lsName, lsLastName, lsEmail, lsEdad, lsIdUsuario} = getUserInfo();
    // getUserInfo();

    // // alert ("ESTE ES EL QUE VAlsName retornado: " + lsName + " lastName: " + lsLastName + ", los otros estaran igual" )
    // console.log("ESTE  ES EL QUE VA: Edad: " + user.edad + ", Email: " + user.email + ", Apellido: " + user.lastName + ", Name: " + user.name + ".");

    const onClickVolver = () => {
        navigate('/home')   //se va a la home --> no deberia recargar la pagina como hace en Productos
                            //Falta ver que si la recarga porque se va a index.html
    }

  return ( 
    <div className="User__PortadaUser">
        <div className="User__Card">
            <div className="User__ImagenUsuario">
                <img src={imgLogin} alt="Inicio de Sesion"/>
            </div>
            <div className="User__CntNuevaCuenta">
                <p>Datos del Usuario:</p>
                {/* Debio ser un form pero como el action aun no se JS: no funciona los botones para volver: entonces pongo un div */}
                <div className="User__FormCuenta" action="">
                    <div className="User__container-input">
                        <label htmlFor="name">Nombre:</label>
                        <input id="name" className="User__CamposEntrada" type="text" name="name" readOnly="readOnly" defaultValue= {name}/>
                    </div>
                    <div className="User__container-input">
                        <label htmlFor="lastName">Apellido:</label>
                        <input id="lastName" className="User__CamposEntrada" type="text" name="lastName" readOnly="readOnly" defaultValue={lastName}/>
                    </div>
                    <div className="User__container-input">
                        <label htmlFor="email">Email:</label>
                        <input id="email" className="User__CamposEntrada" type="email" name="email" readOnly="readOnly" defaultValue={email}/>
                    </div>
                    <div className="User__container-input">
                        <label htmlFor="edad">Edad:</label>
                        <input id="edad" className="User__CamposEntrada CampoEntradaPass" type="number" name="edad" readOnly="readOnly" defaultValue={edad} />
                    </div>
                    <div className="User__container-input">
                        <label htmlFor="idUsuario">Id Usuario:</label>
                        <input id="idUsuario" className="User__CamposEntrada CampoEntradaPass" type="text" name="idUsuario" readOnly="readOnly" defaultValue={id}/>
                    </div>
                    <div className="User__DivBotonera">
                        <div className="User__BotonAlta">
                            {/* Ojo el href hace que despues de hacer el onclik, vaya al href, le saco el href */}
                            <a className="User__AHref_submit" >
                                <button className="User__Submit" onClick={onClickVolver} > <ins>V</ins>olver</button>
                            </a>
                        </div>
                        {/* <!-- <div className="User__BotonAlta">
                            <a className="User__AHref_submit Submit" href="../../index.html"><button type="submit" ><ins>C</ins>ancelar</button></a>
                        </div> --> */}
                    </div>
                </div>
            
            </div>    
        </div>
    </div>
  )
};

export default User;