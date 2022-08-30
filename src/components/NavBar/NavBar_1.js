import SideBar from "../SideBar/SideBar";

import './NavBar.css';  // vinculo estilos
import './NavMedQ.css'  // estilos en cascadas propios
import '../../fontawesome/fontawesome-free-5.15.3-web/css/all.css'; //para poder usar estilos de Fontawesome

import logoKiwi from '../../Imagenes/LogoKiwi.jpg';

import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'



// ME LO LLEVO PARA LA HOME :)
// alert ("¡¡ Bienvenido a 'Kiwi Tiendas' !! \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse. \n3- Comprar (Sección 'Productos' - requerie inicio de sesiòn). \n4- Agregar productos nuevos a la tienda (desde 'Sección Productos'). \n5- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad");

// //Definicion de variables
let lsToken = "";
let lsEmail = "facu";
let lsLblUsMostrar = ""
let lsLblBotonLogInOut = ""

//Esto se ejecuta una sola vez al principio que carga el componente.
// alert ("Componente NavBar 0:  previo al entrar al componente")
console.log ("Componente NavBar 0:  previo al entrar al componente")

//aca no puedo definir hooks, los estads y useEffect se definen dentro de la funcion del componente const NavBar = () => {}

//-------------------------------- Funcion que devuelve el DIV del componente -------------------------//
const NavBar = () => {
    // alert ("Componente NavBar 1: Inicio Ejecución interior del componente NavBar = ()")
    console.log ("Componente NavBar 1: Inicio Ejecución interior del componente NavBar = ()")

    //Al manejar estados: todo lo que está aca se va a ejecutar cada vez que cambia un useState o hook    
    
    //recupero valores del storage primero
    lsEmail = localStorage.getItem('emailUsuario');
    lsToken = localStorage.getItem('token');  
    //Armo varibles para que se van a mostrar en el NavBar
    if ((lsToken) && !(lsToken === 'undefined')) {
        // alert("NavBar: 1- Tiene token y es: " + lsToken)
        console.log ("NavBar: 1- Tiene token y es: " + lsToken)
        // --> Pongo el mail del usuario y el boton de 'Logout'
        if (lsEmail) {
            lsLblUsMostrar = "(" + lsEmail + ")";
            lsLblBotonLogInOut = "Logout";  //seteo el botón 'Login/Logout' para que se deslogue
        } else {
            lsLblUsMostrar = "(" + lsEmail + ")";
            lsLblBotonLogInOut = "Logout";  //seteo el botón 'Login/Logout' para que se deslogue
        }
    } else {
        // alert("NavBar: 1- NO tiene token")
        console.log("NavBar: 1- NO tiene token")
        lsLblUsMostrar = "( - )"
        lsLblBotonLogInOut = "Login" //cambio botón 'Login/Logout' para que se logue
    }

    // DEFINO LOS ESTADOS YA CON LOS VALORES DEL STORAGE (Recién recuperados --> si cambio el storage los va  a pintar en el HTML)
    const [usMostrar, setUsMostrar] = useState(lsLblUsMostrar);
    const [btnLogInOut, setBtnLogInOut] = useState(lsLblBotonLogInOut);
        //** recordar que por cada uno de estas actulizacines de estado si cambio arranca de arriba, updatea el componente
        //**            y arranca otra vez desde NavBar = () => { */
  
    //Aprendizaje: para usar este navigate: este componente NavBar.js tiene que estar dentro del  <BrowserRouter>
    const navigate = useNavigate() //definicion para poder usar navigate
    // alert('paso LA DECLARACIÓN DE NAVIGATE navigate');

    //Evento Click en el 'lblUsuario'
    const onClickLblUsuario = () => {
        // alert ("NavBar: A- Entro en el onClick del Lbl de Usuario: como uso el Navigate --> No recarga la pagina, sino el window.location.replace --> recarga la pagina.");
        
        if (lsLblUsMostrar !== "( - )" ) {
            // window.location.replace("/User");  //deberia usar el navigate para que no recargue la pagina en el navegador
            navigate('/user');  
        } else {
            //este alert esta bien es para comunicar al usuario este hecho.
            alert ("No hay usuario logueado para ir ver los datos del mismo! \nLoguese primero para acceder a los datos del usuario.")
        }
    }

    //Evento Click en 'Login/Logout'
    const onClickLoginLogout = () => {
        //  alert("NavBar: B- Entro al onClickLoginLogout y el usMostrar es: '" + lsLblUsMostrar + "'");
         console.log("NavBar: B- Entro al onClickLoginLogout y el usMostrar es: '" + lsLblUsMostrar + "'");
         
         if (lsLblBotonLogInOut === 'Login') {
        // if (btnLogInOut === 'Login') {
            //  alert ("Entro al Login ehhhh PERO COMO AHORA USO el 'navigate('/login') --> NO RECARGA LA PAGINA. En cambio ' EL Window.location.replace --> recarga lapagina --> mirá arriba...!!!")
             console.log ("Entro al Login ehhhh PERO COMO AHORA USO el 'navigate('/login') --> NO RECARGA LA PAGINA. En cambio ' EL Window.location.replace --> recarga lapagina --> mirá arriba...!!!")
            
            //Aca habria que ver el tema de las rutas // VIDEO-CLASE de Rute y New Rute --> 14/Oct/21
            //window.location.replace("./pages/Login/login.html")
            // Window.location.replace("../../pages/Login/login.html")  // ../subo 1 nivel estoy en Componentes, luego subo ../ otro nivel estoy en src
            // //Ahora con el Route tan solo:
            // navigate('/login');   --> PERO NO ANDA, CUANDO DECLARO ARRIBA const navigate = useNavigate(); ==>
            //                              ==> se rompe y no renderiza queda en pantalla verde

            //AHORA SI USO el Window.location.replace funciona pero recarga la pagina
            // window.location.replace("./login")
            navigate('/login')

        } else {
            //Está en botón --> 'Logout'
            // alert ("NavBar: Entro al Logout --> se va a desloguear: borro el local storage el 'token' y el 'emailUsuario'");
            console.log ("NavBar: Entro al Logout --> se va a desloguear: borro el local storage el 'token' y el 'emailUsuario'");

            //Deslogueo al usuario 
            localStorage.setItem('token', undefined);
            localStorage.setItem('emailUsuario', "");
            //Seteo variables a ser mostradas en el HTML - Front End
            lsLblUsMostrar = "( - )"
            lsLblBotonLogInOut = "Login" //cambio botón 'Login/Logout' para que se logue
            // IMPORTANTE: Esto asi no anda --> deberia usar un UseEffect  --> repasa VIDEO-CLASE --> 
            // lblUsuario.innerHTML = ""
            // btnLogin.innerHTML = "Login";
            // Esto va hacer que se cambien los estados y vuelva a renderizar el componente
            setUsMostrar(lsLblUsMostrar);
            setBtnLogInOut(lsLblBotonLogInOut);
                // --> SE VA A RENDERIZAR TODO DE NUEVO EL COMPONENTE
            alert ("Se cerró la seción Exitosamente!  ")
            navigate('/home')
        }
    }

    //  NO FUNCIONA XQUE NO VA A LA SECCION #INICIO
    // const onClickInicio = () => {
    //     alert ("entro en click Inicio")
    //     navigate('/home')
    // }

    const onClickComprar = () => { 
        // alert ("Esta queriendo ir a la seccion Comprar (Componente Products.js), El token es " + lsToken);
        //Si tiene token Y es <> de 'undefined' ==>  hay usuario logueado
        if ((lsToken) && !(lsToken === 'undefined')) {
            // window.location.replace("/User");  //deberia usar el navigate para que no recargue la pagina en el navegador
            navigate('/products');   
        } else {
            alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
            navigate('/login'); //voy al login para que se logue
        }
    }

    return (
        <div stye={{ marginTop:"0%", padding: "0px" }}>
            <SideBar/>
            <header>
            <div className="encabezado">
                <div className="logo">
                    <a className="ARefLogo" href="/home#Inicio">
                           {/* <img src={logo} className="App-logo" alt="logo" /> */}
                           <img className="ImagenLogo" src={logoKiwi} alt="LogoKiwi"/>    
                    </a>
                    <div className="LogoOpacidad"></div>
                </div>
                
                <nav className="NavBar">
                    <ul className="ListaElementos">
                        <li className="ElementoNav">
                            <a href="/home#Inicio" accessKey="i"><ins>I</ins>nicio</a>
                            {/* No funciona xque no va a la seccion # */}
                            {/* <a onClick={onClickInicio}>Inicio</a> */}
                                {/* redireccionar de esta manera hacer recargar la pagina */}
                                {/* FALTAR AVIERGUAR SI ES ASI */}
                        </li>
                        <li className="ElementoNav">
                            <a href="/home#QuienesSomos" accessKey="q" className="LiQuienesSomos"><ins>Q</ins></a>
                        </li>
                        <li className="ElementoNav"> 
                            {/* <!-- <a href="#Productos" className="LiProdcutos">Prod</a> --> */}
                            <a onClick={() => onClickComprar()} accessKey="r" className="LiProdcutos">Comp<ins>r</ins>ar</a>
                        </li>
                        <li className="ElementoNav">
                            <a href="/home#Pedidos" accessKey="p" className="liPedidos"><ins>P</ins>ed</a>
                        </li>
                        <li className="ElementoNav"><a href="/home#Contacto" accessKey='c'><ins>C</ins>ontacto</a></li>
                        <li className="ElementoNav" id="lblUsuario" onClick={() => onClickLblUsuario()}>{usMostrar}</li>
                        {/* <li className="ElementoNav" id="lblUsuario" onClick={onClickLblUsuario}>{usMostrar}</li> */}
                        {/* <li className="ElementoNav" id="lblUsuario" onClick={() => onClickLblUsuario()}>{localStorage.getItem('emailUsuario')}</li> */}
                        {/* <li className="ElementoNav" id="lblUsuario" font-size= "0.70em">{lsLblUsMostrar}</li> */}

                        {/* <!-- <li><a href="login.html">
                        <button id="btnLogin" className="BtnLogin" >Login</button></a></li> --> */}
                        {/* <!-- El login lo paso a manejar por el evento click del boton dentro del javascript 'index.js' --> */}
                        {/* <li><button id="btnLogin" className="BtnLogin" onClick={onClickLoginLogout}> {btnLogInOut}</button></li>  */}
                        {/* <li><button id="btnLogin" className="BtnLogin" onClick={() => onClickLoginLogout()}> {lsLblBotonLogInOut}</button></li>  */}
                        <li><button id="btnLogin" className="BtnLogin" onClick={() => onClickLoginLogout()} accessKey="l" > {btnLogInOut}</button></li> 
                        {/* onClick={() => navigate('/home')} */}
                    </ul>
                </nav> 
            </div>
            {/* <div className="Portada" id="Inicio">
                <div className="portada-opacidad"></div> */}
                    {/* <h1 className="TituloPortada1" >¡¡Kiwi tu mejor helado!!</h1> 
                    <h1 className="TituloPortada2">NOSOTROS TE LO LLEVAMOS</h1> */}
            {/* </div> */}
            </header>
        </div>
    )
}


export default NavBar
