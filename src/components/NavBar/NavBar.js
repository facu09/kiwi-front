//Componente NavBar: 
//  ver 2.045: Incopora:
//    Agrega en el NavBar el nombre del usuario en vez del eamil, que se agrego su busqueda en el Login.js
//    Backup:  NavBar_5_AgregaBotonCarritoEnNavBar.js  (que va a abrir un side Bar con lo que tiene comprado)

// import SideBar from "../SideBar/SideBar";  //no esta usando el componete este, sino que lo tiene adento
import './NavBar.css';  // vinculo estilos
import './NavMedQ.css'  // estilos en cascadas propios
import '../../fontawesome/fontawesome-free-5.15.3-web/css/all.css'; //para poder usar estilos de Fontawesome

import logoKiwi from '../../Imagenes/LogoKiwi.jpg';
import imgCarri from '../../Imagenes/CarritoDeComprasBlanco.png'; 

import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

import  ('../../_base.css'); 


// ME LO LLEVO PARA LA HOME :)
// alert ("¡¡ Bienvenido a 'Kiwi Tiendas' !! \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse. \n3- Comprar (Sección 'Productos' - requerie inicio de sesiòn). \n4- Agregar productos nuevos a la tienda (desde 'Sección Productos'). \n5- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad");

// //Definicion de variables
let lsToken = "";
let lsEmail = "facu";
let lsNomUsuario = "";
let lsLblUsMostrar = "";
let lsLblBotonLogInOut = "";

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
    lsNomUsuario = localStorage.getItem('nombreUsuario');  //v.2.045 'lo fui a buscar en el loguin.js
    lsToken = localStorage.getItem('token');  
    //Armo varibles para que se van a mostrar en el NavBar
    if ((lsToken) && !(lsToken === 'undefined')) {
        // alert("NavBar: 1- Tiene token y es: " + lsToken)
        console.log ("NavBar: 1- Tiene token y es: " + lsToken)
        // --> Pongo el mail del usuario y el boton de 'Logout'
        if ((lsNomUsuario) && (lsNomUsuario !== "")) {
            lsLblUsMostrar = "(" + lsNomUsuario.substring(0,10) + ")";
        } else {
            lsLblUsMostrar = "(" + lsEmail.substring(0,10) + ")";
        }
        lsLblBotonLogInOut = "Logout";  //seteo el botón 'Login/Logout' para que se deslogue
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
    //Defino Estado de la SideBar Open/Close
    const [navbarOpen, setNavbarOpen] = useState(false)
  
    //Aprendizaje: para usar este navigate: este componente NavBar.js tiene que estar dentro del  <BrowserRouter>
    const navigate = useNavigate() //definicion para poder usar navigate
    // alert('paso LA DECLARACIÓN DE NAVIGATE navigate');

    //Evento Click en el 'lblUsuario'
    const onClickLblUsuario = () => {
        // alert ("NavBar: A- Entro en el onClick del Lbl de Usuario: como uso el Navigate --> No recarga la pagina, sino el window.location.replace --> recarga la pagina.");
        
        setNavbarOpen(false) //para que cierre el SideBar en caso de que este abierto

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

        setNavbarOpen(false) //para que cierre el SideBar en caso de que este abierto

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
            localStorage.setItem('nombreUsuario', "");
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
        
        setNavbarOpen(false) //para que cierre el SideBar en caso de que este abierto

        //Si tiene token Y es <> de 'undefined' ==>  hay usuario logueado
        if ((lsToken) && !(lsToken === 'undefined')) {
            // window.location.replace("/User");  //deberia usar el navigate para que no recargue la pagina en el navegador
            navigate('/products');   
        } else {
            alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
            navigate('/login'); //voy al login para que se logue
        }
    }

    //Evento Click sobre el Link Inicio
    const onClickInicio = () => {
        setNavbarOpen(false)
    }

    //Evento Click sobre el Link Historia (QuienesSomos)
    const onClickHistoria = () => {
        setNavbarOpen(false)
    }
    
    //Evento Click sobre el Link Historia (QuienesSomos)
    const onClickPedidos = () => {
        setNavbarOpen(false)
    }
    //Evento Click sobre el Link Historia (QuienesSomos)
    const onClickContacto = () => {
        setNavbarOpen(false)
    }
    //Evento Click sobre el boton de 
    const OnClickhandleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <div stye={{ marginTop:"0%", padding: "0px" }}>
            {/* lo meto adentro del NavBar */}
            {/* <SideBar/>   */}
            <header>
            <div className="encabezado">
                <div className="logo">
                    <a className="ARefLogo" href="/home#Inicio">
                           {/* <img src={logo} className="App-logo" alt="logo" /> */}
                           <img className="ImagenLogo" src={logoKiwi} alt="LogoKiwi"/>    
                    </a>
                    {/* <div className="LogoOpacidad"></div> */}
                </div>
                
                <nav className="NavBar">
                    <ul className="ListaElementos">
                        <li className="ElementoNav">
                            <a href="/home#Inicio" accessKey="i" onClick={onClickInicio}><ins>I</ins>nicio</a>
                            {/* No funciona xque no va a la seccion # */}
                            {/* <a onClick={onClickInicio}>Inicio</a> */}
                                {/* redireccionar de esta manera hacer recargar la pagina */}
                                {/* FALTAR AVIERGUAR SI ES ASI */}
                        </li>
                        <li className="ElementoNav">
                            <a href="/home#QuienesSomos" onClick={onClickHistoria} accessKey="h" className="LiQuienesSomos"><ins>H</ins></a>
                        </li>
                        <li className="ElementoNav ElementNavQuedan"> 
                            {/* <!-- <a href="#Productos" className="LiProdcutos">Prod</a> --> */}
                            <a onClick={() => onClickComprar()} accessKey="r" className="LiProdcutos">Comp<ins>r</ins>ar</a>
                        </li>
                        <li className="ElementoNav">
                            <a href="/home#Pedidos" onClick={onClickPedidos} accessKey="p" className="liPedidos"><ins>P</ins>ed</a>
                        </li>
                        <li className="ElementoNav">
                            <a href="/home#Contacto" onClick={onClickContacto} accessKey='c'><ins>C</ins>ontacto</a>
                        </li>
                        <li className="ElementoNav ElementNavQuedan" id="lblUsuario" onClick={() => onClickLblUsuario()}>{usMostrar}
                        </li>
                        {/* <li className="ElementoNav" id="lblUsuario" onClick={() => onClickLblUsuario()}>{localStorage.getItem('emailUsuario')}</li> */}
                        <div className="ElementoNavPegados">
                            <a href="#cartList">
                                <li className="ElementoNavPegados">
                                    <img className="ImagenCarritoNav"  src={imgCarri} alt="Carrito"/>
                                </li>
                            </a>
                            {/* <li>
                                <p className="ElementoNavUsuario" id="cantUnidadesCarrito">($ 0 )</p>
                            </li> */}
                        </div>

                        <li><button id="btnLogin" className="BtnLogin" onClick={() => onClickLoginLogout()} accessKey="l" > {btnLogInOut}</button></li> 

                        <button className= "SideBar_button" onClick={OnClickhandleToggle}>
                            {/* {navbarOpen ? (
                                <MdClose style={{ color: "#fff", width: "30px", height: "30px" }} />
                            ) : (
                                <FiMenu style={{ color: "#7b7b7b", width: "30px", height: "30px" }} />
                            )} */}
                            {navbarOpen ? (
                                <MdClose style={{ color: "var(--fondoVerdeKiwi)" }} />
                            ) : (
                                <FiMenu style={{ color: "var(--fondoVerdeKiwi)" }} />
                            )}
                        </button>
                    </ul>

                    {/* Esta parte es la SideBar */}
                    <ul className={`SB__menuNav ${navbarOpen ? " SB__showMenu" : ""}`}>
                        <li className="SB__ElementoNav">
                            <a href="/home#Inicio" accessKey="i" onClick={onClickInicio}><ins>I</ins>nicio</a>
                        </li>
                        <li className="SB__ElementoNav">
                            <a href="/home#QuienesSomos" onClick={onClickHistoria} accessKey="h" className="LiQuienesSomos"><ins>H</ins></a>
                        </li>
                        <li className="SB__ElementoNav"> 
                            {/* <!-- <a href="#Productos" className="LiProdcutos">Prod</a> --> */}
                            <a onClick={() => onClickComprar()} accessKey="r" className="LiProdcutos">Comp<ins>r</ins>ar</a>
                        </li>
                        <li className="SB__ElementoNav">
                            <a href="/home#Pedidos" onClick={onClickPedidos} accessKey="p" className="liPedidos"><ins>P</ins>ed</a>
                        </li>
                         <li className="SB__ElementoNav">
                            <a href="/home#Contacto" onClick={onClickContacto} accessKey='c'><ins>C</ins>ontacto</a>
                        </li>
                        <li className="SB__ElementoNav" id="lblUsuario" onClick={() => onClickLblUsuario()}>{usMostrar}
                        </li>
                        {/* Agrego la imagen del carrito con cuanto lleva gastado */}
                        <div className="ElementoNavPegados">
                            <a href="#cartList">
                                {/* <li className="ElementoNavPegados"> */}
                                 <li>
                                    <img className="ImagenCarritoNav"  src={imgCarri} alt="Carrito"/>
                                </li>
                            </a>
                            {/* <li>
                                <p clasclassNames="ElementoNavUsuario" id="cantUnidadesCarrito">($ 0 )</p>
                            </li> */}
                        </div>
                        {/* Fin Agrego la imagen del carrito con cuanto lleva gastado */}
                        <li>
                            <button id="btnLogin" className="SB__BtnLogin " onClick={() => onClickLoginLogout()} accessKey="l" > {btnLogInOut}</button>
                        </li> 
                        <li>
                            <button className= "SB__sideBar_button" onClick={OnClickhandleToggle}>
                                {(<MdClose style={{ color: "var(--fondoVerdeKiwi)" }} />)}
                            </button>
                        </li> 
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
