// Componente Login que resuelve el mismo incorporando Axios
//       mas va a buscer datos del usuario (el nombre) con axios get/user: 
//       ---> Backupeado archivo como Login_5_ConAxios&GetUser.js

// import useFetch from '../../hooks/useFetch'
// import { login } from "../../services/auth";
import './Login.css';
import './mediaQLogin.css';  //importo meida queries
import  imgLogin from '../../Imagenes/InicioSesion_Copia3.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Agrego el uso de axios del componente creado en /src/axios/axios.js
import { instance } from '../../axios/axios';

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
    
            // Prueba para ver que funcione el evento que cree, y que puedo recuperar los valores de email y passwor 
            console.log("Pasó por onClickSubmitLogin: Tenemos Email: -> '" +  email + "', la Password es: '" + password + "'.");

            //Fetch comun
            const body = {
                email: email,
                password: password
            };
            console.log("Muestro el Body antes de mandarlo al fetch: ", body)
            console.log ("Muestro el JSON.stringify(body) para ver que tiene antes de mandarlo al fetch: " , JSON.stringify(body))
            
            // Ejecuto el Login con el Fetch mando el email y el passwor y si logea bien recupera el token, 
            // const response = await fetch('https://back-sandbox.herokuapp.com/api/auth/login', {
            // const response = await fetch('https://app-kiwi-backend.herokuapp.com/api/auth/login', {
            //pruebo con backend corriendo en el local host http://localhost:3000/api    
            // const response = await fetch('http://localhost:3000/api/auth/login', {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
                // mode: 'no-cors',
                // body: JSON.stringify(body)
            // });
            
            // 28/08/2022 ESTE ES EL QUE VA PERO PRUEBO CON FETCH
            //Ahora solo con axios //Uso el instance de axios creado por mi en /src/axios/axios.js --> son solo 1 linea
            //   recorda que la base url es: baseURL: 'https://back-sandbox.herokuapp.com/api'
             const response = await instance.post('/auth/login', { email, password });
             console.log(response);

            //Recupero el token
            //      const token = await response.json();  // y ahora el token es un objeto xq el .json() devuelve un objeto
            // REPASO COMO ACCEDER A LAS PROPIEDADES DE UN OBJETO  // objetoPiola["propiedad"])
            //devuelve --> el token es ===  {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30.DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'}
            //Ejemplos para mostrarlos
            // console.log(token["token"]);
            // alert ("El token es " +  token["token"]);  //-->  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ…I0M30. DplCA07ikkI8STZQMe6hekDpte681VV_gSt-n83cPfk'
            // Del Fetch clasico desestrucutro
            // const { token } = await response.json();  // y ahi tomo del response.json() solo el token ya string
            // console.log ("El token es === ", token);

            const token = (response.data.token); //tomo el token ya string
            
            console.log (". Token: ", token)

            if (token) {
                //Guardo datos del usuario:
                console.log ("Se logueo bien: Se guarda el token y el email en el localSotorage y luego se navega a '/home'");
                localStorage.setItem('token', token);
                localStorage.setItem('emailUsuario', email);
                localStorage.setItem('nombreUsuario', ''); // creo ya el espacio en el storage para el nombre
                               
                console.log ("esta entrando a la parte nueva")

                // # 28/08/2022 Comento Uso del Back de Juli
                // // //#V.2.045 Agrego ir a buscar nombre del usuario para ponerlo en el navBar en vez del email.
                // // //resuelvo con Axios, en 1 sola linea: la base url  baseURL: 'https://back-sandbox.herokuapp.com/api',
                // // //      el instance ya tiene el headers y recupera el token del storage
                // // const respons = await instance.get('/user')
                // // const json = respons.data //
                // // // console.log(json.data);  //devuelve un objeto llamado data
                // // // console.log("Usando el json.data.Campo:  Edad: " + json.data.age + ", Email: " + json.data.email + ", Apellido: " + json.data.lastName + ", Name: " + json.data.name + ".");
                // // console.log ("ya fue a buscar get del user del token que esta guardado en el sotrage")
                // if (json.data.name) {
                //     //guardo en el localStorage el nombreUsuario   
                //     localStorage.setItem('nombreUsuario', json.data.name);
                //     console.log ("ya guardo en el storage el nombre del usuario" + json.data.name)
                // }

                //# 28/08/2022 Ahora con mi BackEnd Ago2022
                //  voy busco el nombre para tenerlo busco por email
                const respons = await instance.get('/users/search?email=' + email)
                const json = respons.data
                console.log (". Login.js: Ya fue a buscar con Axios ruta 'get /users/search?email=' del user del token que esta guardado en el sotrage, a traves del email")
                console.log (". Y el nombre del usuario esta acá adentro de este respons.data = json: ", json)
                
                if (json.name) {
                    //guardo en el localStorage el nombreUsuario   
                    localStorage.setItem('nombreUsuario', json.name);
                    console.log (". Acá ya guardó en el storage el nombre del usuario: '" + json.name + "'.")
                } else{
                    //sino tiene nombre repito el mail
                    localStorage.setItem('nombreUsuario', email);
                }

                //antes de ir /home tiro un alert para poder leer el console.log de la consola
                // alert ("Encontro el nombre: " + json.name)
                //Finalmente redirecciono a Home
                 window.location.replace("/home");  //con window.location.replace -->  recarga la pagina y toma el cambio de usuario

                // Falta ver de resolver --> el navigate no cambie el boton a 'Logout' ni pone el nombre de usuario
                // navigate("/home");   //uso navigate (para que no recarte la pagina home)

            } else {
                 alert ("\n ¡El Email o la Contraseña son Incorrectos!\n \n Vuelva a Intentarlo!!");
            }
        
        } catch (error) {
            
            if (error = "Request failed with status code 401") {
                 alert ("\n ¡El Email o la Contraseña son Incorrectos! \n(Status code: 401). \n \n Vuelva a Intentarlo!!");
            } else {
                console.log ('Error en la función onSubmitLogin: ' + error)
                alert("Componente Loguin: Error: " + error);
            }
             campoEmail.focus() 
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
