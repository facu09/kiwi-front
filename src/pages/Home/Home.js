import  './Home.scss';
import './HomeMedQ.css';
// import '../../variables.scss';

//Importo imagenes para Carruseles de Productos y de Pedidos
import imgChocoHelado from '../../Imagenes/Kiwi_ChocoHelado.jpg';
import imgTorta1 from '../../Imagenes/Kiwi_Torta1.jpg';
import imgBombon1 from  '../../Imagenes/Kiwi_bombon1.jpg';
import imgPromo1 from '../../Imagenes/KiwiPromo1.jpg';
import imgDelivery2 from '../../Imagenes/Delivery2.jpg'
import imgDelivery3 from '../../Imagenes/Delivery3.jpg'
import imgDelivery1 from '../../Imagenes/Delivery1.jpg';

// #31/08/22 estoy quitando los carruseles para probar que compile
// //importo Carrusel de Bootstrap y el css correspondiente general de bootstrap
// import Carousel from 'react-bootstrap/Carousel'
// import 'bootstrap/dist/css/bootstrap.min.css'; //el estilo en cascada para que funcionen los componentes

import { useState, useEffect } from 'react';
import Toast from '../../components/Toast/Toast'  //Componente para usar un Toast arriba a la derecha

 // SE MUESTRAN 3 VECES 
//  alert ("¡¡ Bienvenido a 'Kiwi Tiendas' !! \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse. \n3- Comprar (Sección 'Productos' - requerie inicio de sesiòn). \n4- Agregar productos nuevos a la tienda (desde 'Sección Productos'). \n5- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad");

const Home = () => {

    //Defino estados necesarios
    const [requiereAviso, setRequiereAviso]  = useState(false);
    const [mensajeAviso, setMensajeAviso] = useState('HOLA');

    useEffect(() => {
        //Por ahora meto alert con la funcionalidad a evaluar, luego metere una especie de Toast
        alert ("¡¡ Bienvenido a 'Kiwi Tiendas' !! (Versión 4.3 - Oct2022) \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse (Crear una cuenta). \n3- Comprar (requerie tener cuenta y haber iniciado sesión). \n4- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n5- Ver el último pedido realizado por el usuario para repedirlo incluso pudiéndolo modificar. \n\n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad");
        
        // setMensajeAviso("¡¡ Bienvenido a 'Kiwi Tiendas' !! \n Usted podrá: \n1- Iniciar sesión.\n2- Registrarse (Crear una cuenta). \n3- Comprar (requerie tener cuenta e inicio de sesión). \n4- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. \n** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad")
       
        // setMensajeAviso("¡¡ Bienvenido a 'Kiwi Tiendas' !!" +
        //         " Usted podrá: 1- Iniciar sesión. 2- Registrarse (Crear una cuenta). 3- Comprar (requerie tener cuenta e inicio de sesión). 4- La tienda conservará el carrito con su posible compra para cada usuario mientras no cierren el navegador, pudiendo navegar por el sitio e incluso cambiar de usuario sin perder el mismo. ** Este aviso esta puesto para que pueda ser evaluada toda la funcionalidad")

        setMensajeAviso("holas: mensaje cortito de aviso de error a ver como se ve")
       
        // setRequiereAviso(true)
        // alert (mensajeAviso + ", el mensaje de aviso fue seteado a " + mensajeAviso + " y estado requiereAviso esta en " + requiereAviso + ".")

    }, []); 
    // con el ", [])": --> se va a ejecutar 1 sola vez al principio


   
    return (
        // ** Devuelve 1 solo DIV ---------------------------------------------------------------
        <div className= "DivHome">

            {requiereAviso &&  <Toast  message={mensajeAviso}/>}


            <div className="Portada" id="Inicio">
                <div className="portada-opacidad"></div>
                {/* <h1 className="TituloPortada1" >¡¡Kiwi tu mejor helado!!</h1>  */}
                {/* <h1 className="TituloPortada2">NOSOTROS TE LO LLEVAMOS</h1>  */}
            </div>

            {/* //Main con el cuerpo de la HOME ---------------------------------------------------- */}
            <main>
                <section className="sect-history" id="QuienesSomos">
                    <div className="card-history">
                        <h2 className="TitleCard">Historia</h2>
                        <p className="history">Nico, ipsum dolor sit amet consectetur adipisicing elit. Libero, cupiditate laborum placeat
                        provident nam in expedita sed qui quidem, corrupti corporis quis quas fuga accusamus nesciunt
                        voluptatum veritatis iusto eius Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam vero
                        quisquam ipsam perspiciatis. 
                        Consequuntur dignissimos perferendis reprehenderit corrupti consequatur, autem neque natus eum, optio eligendi saepe architecto eos, cupiditate incidunt! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt neque labore aperiam blanditiis rem quidem iusto fugiat repellendus sapiente ab distinctio esse reiciendis, deleniti ex velit ipsa perspiciatis voluptates veritatis!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptates quisquam est recusandae cum, odio beatae quod obcaecati, suscipit repudiandae error earum, atque blanditiis ipsa et delectus? Ipsum, ut beatae?
                        </p>
                        <div className="VerMasHist" >
                        <p>leer mas... <br></br> </p> 
                    </div>
                        {/* <!-- <p className="segundo-parrafo-history">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, at? Minus vel magnam asperiores,
                            deserunt delectus maiores nulla reiciendis in autem, nemo recusandae reprehenderit molestiae quis
                            eaque sit quae neque.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, at? Minus vel magnam asperiores,
                            deserunt delectus maiores nulla reiciendis in autem, nemo recusandae reprehenderit molestiae quis
                            eaque sit quae neque.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, at? Minus vel magnam asperiores,
                            deserunt delectus maiores nulla reiciendis in autem, nemo recusandae reprehenderit molestiae quis
                            eaque sit quae neque.
                        </p> --> */}
                    </div>
                </section>
            
                <section className="SeccionProductos" id="Productos">
                    <div className="CardProductos">
                        <h2 className= "TitleCard">Nuestros Productos</h2>
                        
                        {/* Para meter bootstrap en react tengo que instalarlo:
                            npm install react-bootstrap bootstrap
                        y luego importar el carrucel en cuestion
                            import Navbar from "react-bootstrap/Navbar"; 
                        ademas tengo que vincular su css para que funcionen los componentes
                            import 'bootstrap/dist/css/bootstrap.min.css';
                        */}
                        
                        {/* Aca el 31/08/22 volé el carrousel de bootstrap que daba problemas quedo backup en Home_bk31Ago22.js */}
                        {/* Agrego una imagen fija de 1 producto */}
                        <img src={imgChocoHelado} alt="ImagenProducto"/>

                    </div>
                </section>

                <section className="SeccionPedidos" id="Pedidos">
                    <div className="CardPedidos">
                        <h2 className= "TitleCard">Pedidos</h2>
                           {/* Aca el 31/08/22 volé el carrousel de bootstrap que daba problemas quedo backup en Home_bk31Ago22.js */}
                            {/* Agrego una imagen fija de 1 producto */}
                            <img src={imgDelivery2} alt="ImagenProducto"/>

                    </div>
                </section>
      
                <section className="SeccContacto" id="Contacto">
                    <div className="CardContacto">
                        <h2 className="TitleCard">Contacto</h2>
                        <form className= "FormContacto" action="">
                            <div className="container-input">
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" name="nombre" placeholder="Ingrese su nombre"/>
                            </div>
                            <div className="container-input">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" placeholder="Ingrese su email"/>
                            </div>
                            <div className="container-input">
                                <label htmlFor="mensaje">Mensaje:</label>
                                <textarea type="mensaje" placeholder="Ingrese su mensaje"></textarea>
                            </div>
                            <div className="container-btn">
                                <button className="BtnEnviar" tabIndex="0" accessKey="n">E<ins>n</ins>viar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>


            {/* Falta borrar esto: (aca podria seguir agregando cosas DIVs, Cards, Secciones, etc...)  ---------*/}
            {/* <h1>Esta es la HOME suit Home</h1>
            <h2>Con todo el Body</h2>
            <h3>Con todas las SECCIONES</h3>
            <p>  Este es Contenido para mostrar</p>
            <p>  Este es Contenido para mostrar</p>
            <p>  Este es Contenido para mostrar</p>
            <p>  Este codigo esta en la pagina Home.js al final:  Eliminarlo!!!</p> */}
        </div>
    )
}

export default Home
