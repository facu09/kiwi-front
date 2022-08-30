import imgLogin from '../../Imagenes/InicioSesion_Copia3.png';
import './User.css';

import { useState } from 'react';

//Recupero los Datos del usuario que esta logueado (Le paso el token actual)
//   El BackEnd, con el token, va y busca el usuario que se logueo con ese token y devuelve sus datos personales
//   En el Postman de BackEnd de Juli:   
//     Link Postman web (obtenido a través del boton de share): 
//     https://go.postman.co/workspace/ApiTest~bd1d14dc-98c0-41ae-9a57-711d9ddcf18b/collection/17226216-3f17d7f1-e1bb-4b97-acea-0c1905c737e2
//     Link pasado por Juli:  https://www.getpostman.com/collections/77d0c1a7abe6a8e0f71e
//          La base Url deberia ser: https://back-sandbox.herokuapp.com/api

//  alert ("Componenete User: 0 - Ejecución Previa del User.js");
 console.log("Componenete User: 0 - Ejecución Previa del User.js");

const User = async ()  =>  {
    
    // alert ("Componente User 1: Inicio Ejecución interior del componente User = ()")
    console.log(("Componente User 1: Inicio Ejecución interior del componente User = ()"))

    let lsName = ''
    let lsLastName = ''
    let lsEmail = ''
    let lsEdad = 0
    let lsIdUsuario = ''

    //Recupero el Token del Storage, tiene que estar xque hay alguien logueado
    const lsToke = localStorage.getItem("token");

    // alert("Componenete User: 1 -  El Token: " + lsToke)
    console.log("Componenete User: 1 -  El Token: " + lsToke)
    
    try{
        const response = await fetch('https://back-sandbox.herokuapp.com/api/user', {
            method: 'GET',
            headers: {
                // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDE0YTc2ZDk5YmM3MDM5NDU1OGU1OCIsImlhdCI6MTYzMDU1MDI4OH0.APYZUEhrg1OQeXcsOzWdEeqMpwkvIJ5yBqPe0IzI378"
                Authorization: "Bearer " + lsToke
            }
        });

        const json = await response.json();
        console.log(json);
        console.log("Edad: " + json.data.age + ", Email: " + json.data.email + ", Apellido: " + json.data.lastName + ", Name: " + json.data.name + ".");
        
        lsName = json.data.name;
        lsLastName = json.data.lastName;
        lsEmail = json.data.email;
        lsEdad = json.data.age;
        lsIdUsuario = json.data.id;

    } catch( error ) {
        alert('error' + error )
        lsName = "Facundo Error"
        lsLastName = "Cigliuti Error"
        lsEmail = 'facu1@gmail.com_Error  '
        lsEdad = '31_Error'
        lsIdUsuario = "12313002333_Error"
        alert ("lsName asignado por error: " + lsName + ", los otros campos estan hardcodeados.")
    }

    // alert ("ESTE ES EL QUE VAN lsName retornado: " + lsName + " lastName: " + lsLastName + ", los otros estaran igual" )
    console.log("ESTE ES EL QUE VAN lsName retornado: " + lsName + " lastName: " + lsLastName + ", los otros estaran igual" )

    // DEFINO LOS ESTADOS YA CON LOS VALORES DEL STORAGE (Recién recuperados --> si cambio el storage los a pintar en el HTML)
       const [name, setName] = useState(lsName);
       const [lastName, setLastName] = useState(lsLastName);
       const [email, setEmail] = useState(lsEmail);
       const [edad, setEdad] = useState(lsEdad);
       const [idUsuario, setIdUsuario] = useState(lsIdUsuario);

    //    const [name, setName] = useState('Facundo');
    //    const [lastName, setLastName] = useState('Cigliuti');
    //    const [email, setEmail] = useState('facu1@gamail.com');
    //    const [edad, setEdad] = useState(30);
    //    const [idUsuario, setIdUsuario] = useState('123132132');

    // //    
    //    const [name, setName] = useState(lsName);
    //    const [lastName, setLastName] = useState(lsLastName);
    //    const [email, setEmail] = useState(lsEmail);
    //    const [edad, setEdad] = useState(lsEdad);
    //    const [idUsuario, setIdUsuario] = useState(lsIdUsuario);

  return ( 

    <div className="PortadaUser">
        <div className="Card">
            <div className="ImagenUsuario">
                <img src={imgLogin} alt="Inicio de Sesion"/>
            </div>
            <div className="CntNuevaCuenta">
                <p>Datos del Usuario:</p>
                {/* Debio ser un form pero como el action aun no se JS: no funciona los botones para volver: entonces pongo un div */}
                <div className = "FormCuenta" action="">
                    <div className="container-input">
                        <label for="name">Nombre:</label>
                        <input id="name" className="CamposEntrada" type="text" name="name" readOnly="readOnly" value= {name}/>
                    </div>
                    <div className="container-input">
                        <label for="lastName">Apellido:</label>
                        <input id="lastName" className="CamposEntrada" type="text" name="lastName" readOnly="readOnly" value={lastName}/>
                    </div>
                    <div className="container-input">
                        <label for="email">Email:</label>
                        <input id="email" className="CamposEntrada" type="email" name="email" readOnly="readOnly" value={email}/>
                    </div>
                    <div className= "container-input">
                        <label for="edad">Edad:</label>
                        <input id="edad" className="CamposEntrada CampoEntradaPass" type="number" name="edad" readOnly="readOnly" value={edad} />
                    </div>
                    <div className= "container-input">
                        <label for="idUsuario">Id Usuario:</label>
                        <input id="idUsuario" className="CamposEntrada CampoEntradaPass" type="text" name="idUsuario" readOnly="readOnly" value={idUsuario}/>
                    </div>
                    <div className="DivBotonera">
                        <div className= "BotonAlta">
                            <a className="AHref_submit" href="../../index.html"><button className="Submit" type="submit" > <ins>V</ins>olver</button></a>
                        </div>
                        {/* <!-- <div className= "BotonAlta">
                            <a className="AHref_submit" href="../../index.html"><button className="Submit" type="submit" ><ins>C</ins>ancelar</button></a>
                        </div> --> */}
                    </div>
                </div>
            </div>    
        </div>
    </div>
  )
};

export default User;
