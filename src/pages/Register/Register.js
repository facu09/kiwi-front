import './Register.css';
import './mediaQRegister.css';
import  imgLogin from '../../Imagenes/InicioSesion_Copia3.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//  alert ("Componenete Register: 0 - Ejecución Previa del Register.js");
console.log ("Componenete Register: 0 - Ejecución Previa del Register.js");

const Register = () => {
    const navigate = useNavigate() //definicion para poder usar navigate

    //Defino estados para el ingreso de los inpunts
    const [email, setEmail] = useState(''); 
    const [name, setName] = useState('');
    const [domicilio, setDomicilio] = useState(''); 
    const [mobbile, setMobbile] = useState(''); 
    const [password1, setPassword1] = useState(''); 
    const [password2, setPassword2] = useState(''); 
    
    // # Back viejo prestado de Juli
    // const baseURL = 'https://back-sandbox.herokuapp.com/api';
    // # Back nuevo de Ago2022
    const baseURL = 'https://app-kiwi-backend.herokuapp.com/api'
    //Pruebo Local
    //const baseURL = "http://localhost:3000/api"
                     
    //Definicioes y vinculos a elementos del DOM para poner foco de ser necesario
    const inpEmail = document.getElementById('email');
    const inpName = document.getElementById('name');
    const inpDomicilio = document.getElementById('domicilio');
    const inpMobbile = document.getElementById('mobbile');
    // const photoInput = document.getElementById('photo');
    const inpPassword1 = document.getElementById('password1');
    const inpPassword2 = document.getElementById('password2');

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }
    const handleNameChange = (e) =>{
        setName(e.target.value);
    }
    const handleDomicilioChange = (e) =>{
        setDomicilio(e.target.value);
    }
    const handleMobbileChange = (e) =>{
        setMobbile(e.target.value);
    }
    const handlePassword1Change = (e) =>{
        setPassword1(e.target.value);
    }
    const handlePassword2Change = (e) =>{
        setPassword2(e.target.value);
    }

    useEffect(() => {
        // alert("Entrando en el useEffect de 1 sola vez")
        console.log("Componente Register: Entrando en el useEffect de 1 sola vez")
        // Pongo foco en el email
        // campoEmail.focus()  //esto no funcion, no se puede usar aqui 
                               //--> resuevlo con html en el input agrego el atributo auotFocus
    }, []); 
    // con el ", [])": --> se va a ejecutar 1 sola vez al principio


    //Función para Validar el Alta de un Nuevo Usuario
    const pasaValidacionesAlta = () => {
        //  alert("Email: " + inpEmail.value + ", name: " + inpName.value + ", lastName: " +  inpLastName.value + ", pass1: " + inpPassword1.value + ", pass2: " + inpPassword2.value + ", age " + inpAge.value ); 
        if (!email) {
            alert ("¡Debe ingresar una cuenta de email válido! ");
            inpEmail.focus()
            return false
        } 
        if (!name) {
            alert ("¡Debe ingresar el Nombre del Usuario! ");
            inpName.focus()
            return false
        } 
        if (!domicilio) {
            alert ("¡Debe ingresar el Domicilio del Usuario! ");
            inpDomicilio.focus()
            return false
        } 
        if (!mobbile) {
            alert ("¡Debe ingresar el Celular del Usuario! ");
            inpMobbile.focus()
            return false
        } 
        if (!password1) {
            alert ("¡Debe ingresar ambas Contraseñas! ");
            inpPassword1.focus();
            return false
        } 
        if (!password2) {
            alert ("¡Debe ingresar ambas Contraseñas! ");
            inpPassword2.focus();
            return false
        } 
        if (password1 !== password2) {
            alert ("¡Las contraseñas no son iguales! \n Ambas Contraseñas deben ser iguales.")
            inpPassword1.focus()
            return false
        }

        //Si llego acá es que paso validaciones OK ==> devuelvo true
        return true
    }
    //Fin Funcion PasaValidacionAlta

    const onClickBtnAlta = async (e) => {
        e.preventDefault()
    
        if (pasaValidacionesAlta()) {
            //  alert("Entro al insert del backend de juli");
            //# BackViejo
            // const payload =  {
            //     email: email,                 
            //     password: password1,
            //     name: nombre,
            //     lastName: apellido,
            //     age: edad,
            //     // photo: photoInput.value    //aca tenemos la foto con todo el contenido, hay q trasformalo a base 64
            //     }
            // Back Nuevo
            const payload =  {
                email: email,                 
                name: name , 
                domicilio: domicilio, 
                mobbile: mobbile,
                password: password1,
                role: "USER"
                // photo: photoInput.value    //aca tenemos la foto con todo el contenido, hay q trasformalo a base 64
                }
            console.log("payload: ", payload);
            //  alert (payload);
            try {
                //Voy a Dar de Alta al BackEnd 1 Usuario nuevo
                console.log (". Yendo a meter el fetch ")
                const response = await fetch(baseURL + '/auth/register', {
                    method:'POST',
                    headers: {'Content-Type': 'application/json',
                },
                    body: JSON.stringify(payload)
                });
                const json = await response.json();
                console.log(json);
                // antes
                // const {message} = json
                // ahora
                const {id} = json
                

                //  alert ("Message retornado del BackEnd despues del alta: " + message + ".");
                // antes
                // console.log ("Message retornado del BackEnd despues del alta: " + message + ".");
                console.log ("Message retornado del BackEnd despues del alta: " + id + ".");


                // if (message === "Created") {
                //     alert ("¡¡ Alta del usuario '" + email + "' creado con ÉXITO !!  \n\n Proceda a loguearse para inciar sesión." );
                //     window.location.replace("../Login/login.html");  // subo 2 niveles y estoy en el raiz
                //     //Falta ver si meto un navigate
                // } else {
                //     alert ("¡¡ Alta del usuario NO REALIZADA para el email '" + email + "' !!  \n\n Motivo: \n\n" + message);
                //     inpEmail.focus()
                //     e.preventDefault()
                //     return
                // }
                //# ahora con nuevo backend mio
                if (id) {
                    alert ("¡¡ Alta del usuario '" + email + "' creado con ÉXITO !!  \n\n Proceda a loguearse para inciar sesión." );
                    window.location.replace("../Login/login.html");  // subo 2 niveles y estoy en el raiz
                    //Falta ver si meto un navigate
                } else {
                    const {message} = json
                    alert ("¡¡ Alta del usuario NO REALIZADA para el email '" + email + "' !!  \n\n Motivo: \n\n" + message);
                    inpEmail.focus()
                    e.preventDefault()
                    return
                }

    
            } catch (error) {
                alert('Componente Register: Catch Error: ', error);
            }
        } else {
            // alert ("No paso validación"); --> no hago nada
        }
    }


    const onClickBtnCancelar = () => {
        navigate('/home');
    }

    return (
        // <div style={{ marginTop:"7%" }} >
        //     <h1>Este es el Formulario de Registro</h1>
        //     <h2> Aca vendrá el futuro formulario de Registro </h2>
        // </div>
    <div className="Rgst_PortadaPg">
        <div className="Rgst_Card">
            <div className="Rgst_ImagenUsuario">
                <img src={imgLogin} alt="Inicio de Sesion"/>
            </div>
            <div className="Rgst_CntNuevaCuenta">
                <p>Alta nueva cuenta:</p>
                <form >
                    <div className="Rgst_FormCuenta" action="">
                        <div className="Rgst_container-input">
                            <label for="email">Email:</label>
                            <input id = "email" className="Rgst_CamposEntrada" type="email" onChange={handleEmailChange} name="email" placeholder="Ingrese su email" autoFocus/>
                        </div>
                        <div className="Rgst_container-input">
                            <label for="name">Nombre:</label>
                            <input id= "name" className="Rgst_CamposEntrada" type="text" onChange={handleNameChange} name="name" placeholder="Ingrese su nombre"/>
                        </div>
                        <div className="Rgst_container-input">
                            <label for="lastName">Domiclio:</label>
                            <input id= "lastName" className="Rgst_CamposEntrada" type="text" onChange={handleDomicilioChange} name="domicilio" placeholder="Ingrese su domicilio" />
                        </div>
                        <div className="Rgst_container-input">
                            <label for="nombre">Celular:</label>
                            <input id= "mobbile" className="Rgst_CamposEntrada" type="text" onChange={handleMobbileChange} name="mobbile" placeholder="Ingrese su celular"/>
                        </div>
                        <div className="Rgst_container-input">
                            <label for="Psw1">Password:</label>
                            <input id="password1" className="Rgst_CamposEntrada CampoEntradaPass" type="password" onChange={handlePassword1Change} name="Psw1" placeholder="Password" />
                        </div>
                        <div className="Rgst_container-input">
                            <label for="Psw1">Password:</label>
                            <input id="password2" className="Rgst_CamposEntrada CampoEntradaPass" type="password" onChange={handlePassword2Change} name="Psw2" placeholder="Repit el Password" />
                        </div>
                        <div className="Rgst_DivBotonera">
                            <div className="Rgst_BotonAlta" tabIndex="-1">
                               {/* El href lo manejo por el javascript en el evento "onClick" del  */}
                                <a className="Rgst_AHref_submit" tabIndex="-1" >
                                    <button id="btnAlta" className="Rgst_Submit" onClick={onClickBtnAlta} type="button" accessKey="a"> <ins>A</ins>lta</button> 
                                </a>
                            </div>
                            <div className="Rgst_BotonAlta" tabIndex="-1">
                                <a className="Rgst_AHref_submit" tabIndex="-1">
                                    <button id="btnCancelar" className="Rgst_Submit" onClick={onClickBtnCancelar} type="button" accessKey="c"><ins>C</ins>ancelar</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    </div>
    )
}

export default Register
