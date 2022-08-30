//Componente que resuelve el Loguin con Fetch comun: basico

// import useFetch from '../../hooks/useFetch'
// import { login } from "../../services/auth";
import './Login.css';
import './mediaQLogin.css';  //importo meida queries
import  imgLogin from '../../Imagenes/InicioSesion_Copia3.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Se esta usando este backend https://reqres.in/ , en la entada del POST:  LOGIN - SUCCESSFUL
// Para loguearse usamos estas credendiales
// {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
// }
// Si uso el Backend de Juli: es el link: https://back-sandbox.herokuapp.com/api/auth/login
// Para loguearse usamos estas credendiales
// {
//     "email": "facu1@gmail.com", o "juli@gmail.com"
//     "password": "pass12345"
// }


// alert ("Componente Login: 0 - ejecucion Previa")
console.log ("Componente Login: 0 - ejecucion Previa")

const Login = () => {

    // alert ('Componente Login 1 - Inicio Ejecución interior del componente Login.js = ()');
    console.log ('Componente Login 1 - Inicio Ejecución interior del componente Login.js = ()');
    // referencias a campos para manejo de foco
    const campoEmail = document.getElementById("campoEmail");
    const navigate = useNavigate() //definicion para poder usar navigate

    //Estados para los inputs
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    // estados definidos por mi
    // const [msgError, setMsgError] = useState('');
    // const [token, setToken] = useState('');

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onClickSubmitLogin = async (e) => {
        try{
            e.preventDefault()    // para que no recarguela pagina   es para los botones submit   e????   es el evento   event  
    
            const body = {
                email: email,
                password: password
            };
    
            // Prueba para ver que funcione el evento que cree, y que puedo recuperar los valores de email y passwor 
            // console.log('Pasó por el onSubmitLogin, el mail es: ' + email.value + ' y el Password es: ' + password.value);
            // alert('Pasó por onSubmitLogin: Tenemos Email: -> ' +  email + ", la Password es: " + password);
            console.log('Pasó por onClickSubmitLogin: Tenemos Email: -> ' +  email + ", la Password es: " + password);


            // Ejecuto el Login con el Fetch mando el email y el passwor y si logea bien recupera el token, 
            const response = await fetch('https://back-sandbox.herokuapp.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            //Recupero el token
            //      const token = await response.json();  //el token es un objeto
            // REPASO COMO ACCEDER A LAS PROPIEDADES DE UN OBJETO  // objetoPiola["propiedad"])
            //devuelve --> el token es ===  {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30.DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'}
            //Ejemplos para mostrarlos
            // console.log ("el token es === ", token);
            // console.log(token["token"]);
            // alert ("El token es " +  token["token"]);  //-->  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30. DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'
            // localStorage.setItem('token', token["token"]);
            
    
            //Recupero el token como un string desestructurado
           
            const { token } = await response.json();  //el response.json() solo devuelve el token
           
            console.log ("El token es === ", token);
            
            localStorage.setItem('token', token);
           
            //Si se logueo bien!!
            if (token) {
                //Guardo datos del usuario:
                console.log ("Se logueo bien: Se guarda el token y el email en el localSotorage y se navega a '/home'");
                localStorage.setItem('token', token);
                localStorage.setItem('emailUsuario', email);
                window.location.replace("/home");  //con window.location.replace -->  recarga la pagina y toma el cambio de usuario
                // Falta ver de resolver
                // navigate("/home");   //uso navigate (para que no recarte la pagina home)

            }else {
                alert ("\n ¡El Email o la Contraseña son Incorrectos! \n \n Vuelva a Intentarlo.");
                // Decido no blanquear el email y password que los pueda modificar si quiere
                //Blanqueo el email y la contraseña para que las cargue de nuevo
                // setEmail("");
                // setPassword("");
                campoEmail.focus()  //foco a la vieja Vanilla Html usanza.
                                    // Falta ver xque a veces no funciona queda sin foco en ningun lado
            }
        
        } catch (error) {
            console.log ('Error en la función onSubmitLogin: ' + error)
            alert("Componente Loguin: Error: " + error);
        }
    };

    const onClickCancelar = () => {
        navigate('/home')
    }

    const onClickBtnOlvidePass = () => {
        //Sino ingreso email
        if(!email){
            alert ("Debe ingresar un email válido (de un usuario registrado) al cual pueda ser enviada la contraseña!");
            // email.focus();
            //Falta ver como pongo el foco en un campo
            campoEmail.focus()   //No mete el foco --> Falta ver como se resuevle en React, esto a veces no funciona
                                 // y lo rompe por dentro
        } else {
            //si tiene email
            alert("Revise su correo, la CONTRASEÑA fue enviada a la cuenta de correo '" + email + "'");
        }
    }

    const onClickBtnNuevaCta = () => {
        navigate('/register')
    }

    useEffect(() => {
        // alert("Entrando en el useEffect de 1 sola vez" + lsToken)
        console.log("Componente Login: Entrando en el useEffect de 1 sola vez")
        // Pongo foco en el email
        // campoEmail.focus()  //esto no funcion, no se puede usar aqui //--> resuevlo con html en el input agrego el atributo auotFocus
      
    }, []); 
    // con el ", [])": --> se va a ejecutar 1 sola vez al principio


    return (
        <div className="Login__Portada_Login">
            <div className="Login__Card_Login">
                <div className="Login__ImagenUsuario">
                    <img src={imgLogin} alt="Inicio de Sesion"/>
                </div>
                <div className="Login__IniciarSesion">
                    <p>Iniciar Sesión</p>
                </div>
                <div className="Login__Etiquetas">
                    <input className="Login__CamposEntrada" placeholder="Email" onChange={handleEmailChange} value={email} type="email" id="campoEmail" autoFocus/>
                </div>
                <div className="Login__Etiquetas">
                    <input className="Login__CamposEntrada CampoEntradaPass"  placeholder="Password" onChange={handlePasswordChange} value={password}  type="password" />
                </div>
                
                {/* <p className="Login__pError" style={{color: 'red' }}>{error}</p> */}

                <div className="Login__Etiquetas" tabIndex="-1">
                    {/* <a className="Login__AHref_submit"  tabIndex="-1">   */}
                        <button className="Login__BtnEntrar" onClick={onClickSubmitLogin} accessKey="n" > E<ins>n</ins>trar</button>  
                    {/* </a> */}
                </div>
                <div className="Login__Etiquetas" tabIndex="-1">
                    {/* <a className="Login__AHref_submit" href="../../index.html" tabIndex="-1">   */}
                            {/* Tengo que sacar el href, y dejar solo el onClick para que no recargue la pagina */}
                    <a className="Login__AHref_submit" tabIndex="-1">  
                        <button className="Login__CancelarBtn" onClick={onClickCancelar} accessKey="c"> <ins>C</ins>ancelar</button>
                    </a>
                </div>

                {/* <p className="Login__pToken" >{ token }</p> */}
       
                <div className="Login__Etiquetas" tabIndex="-1">
                    {/* <!-- <a className="Login__AHref_submit" href="" tabIndex="-1"> --> */}
                        <button id="btnOlvidePass" className="Login__OlvidePass" onClick={onClickBtnOlvidePass} accessKey="o"> <ins>O</ins>lvidé mi contraseña</button>
                    {/* <!-- </a> --> */}
                </div>
                <div className="Login__Etiquetas" tabIndex="-1">
                    {/* <!-- por cada '../'' subo un nivel de carpeta --> */}
                    {/* <a className="Login__AHref_submit" href="../Register/register.html" tabIndex="-1">   */}
                        <button className="Login__OlvidePass" onClick={onClickBtnNuevaCta} accessKey="r"> C<ins>r</ins>ear una cuenta</button>
                    {/* </a>  */}
                </div>  

            </div>
        </div>
    )
}

export default Login
