import './Products.css';
import './mediaQProd.css';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';


// //Definicion previas y de variables
let lsToken = "";
let lsEmail = "";
const baseURL = "https://back-sandbox.herokuapp.com/api";

// alert ("Componente Productos: 0- ejecución previa.")
console.log ("Componente Productos: 0- ejecución previa.")

const Products = () => {
    //dentro de procedimiento principal
    const navigate = useNavigate();

    //Defino estados necesarios
    const [arrayProductos, setArrayProductos]  = useState([]);
    const [arrayCarrito, setArrayCarrito]  = useState([]);
    const [totalCarrito, setTotalCarrito] = useState(0);
    const [cantTotArticulos, setCantTotArticulos] = useState(0);


    // let arrProd = []
    //Creo el Arreglo para guardar los productos que va mandando al carrito, ya le asigno el estado 
    //     para que cuando cambie un estado y renderice el componente no vacie el arreglo
    //      --> tengo que ver si no puedo eliminar este arreglo y usar solamente el estado
    let myCart = arrayCarrito
    let myCart1= []

     //Evento Click en el boton 'Volver' -- esto no se usa mas -- por ahora -- lo dejo por si lo agrego
     const onClickVolverHome = () => {
        // alert ("Entró en el onClick del Boton Volver Home.  Con el window.location.replace  --> recarga la pagina y con el navigate no.");
        // alert ("Ahora va a usar el window.location.replace  --> y mirá arriba -->  recarga la pagina!! ojo --> mejor usar el navigate('/home')")
        // window.location.replace("/home");  //deberi usar el navigate

        // alert ("Con el navigate NO recarga la pagina, mirá arriba....")
        console.log ("Con el navigate NO recarga la pagina, mirá arriba....")
        // navigate('/home');   //--> PERO NO ESTA ANDANDO CUANDO HABILITO LA SENENCIA DE DECLARACIÓN DEL NAVIGATE  
        navigate('/home') //pruebo esto con el # a ver si anda
    }

    // Procedimiento: Recupera los Productos del BackEnd
    const getProductos = async () => {
    try {
        //Sino tiene token
        if (!lsToken || lsToken === "undefined") {
            //voy a la ventana de Loguin
            alert ("¡¡No hay usuario Logueado!! \n\n Para utilizar esta Sección deberá Iniciar Seción.")
            //Vuelvo al Login para que se loguee
            //Falta usar el navigate y forzar que pase por ahi al menos 1 vez
            window.location.replace("../../pages/Login/login.html"); // subo 2 niveles y estoy en el raiz
        } else {
           
            // alert ("Ahora si va a recuperar los productos disponibles para la venta con el GET del Backend de Juli");
             console.log ("Ahora si va a recuperar los productos disponibles para la venta con el GET del Backend de Juli");
            // Recupero del BackEnd de 
            //'/products?limit=5&offset=0', {
            // const response = await fetch(`${baseURL}/products?limit=15&offset=6`, { // traigo los 15 primeros productos salteando los 6 primeros
            const response = await fetch(`${baseURL}/products?limit=9&offset=5`, {   //traigo los 9 productos, empezando del 5to 
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${lsToken}`
                }
            });

            const json = await response.json();  //recupero lo que devuelve el Get del Fetch
           
            // consolo log para ver que mierda pasaba
            // --> no andaba el estado, hasta que comenté el alert
            // // console.log ("Consolog de Json del getProductos")
            // // console.log (json)
            // // console.log (json.data.data)
            // // arrProd = json.data.data
            // console.log (arrProd)
            // console.log ((arrProd.length))
            // setArrayProductos(arrProd)
            setArrayProductos(json.data.data)
            console.log("Ahora muestro el arreglo del Estado arrayProductos: ")
            console.log(arrayProductos)

            
            // FALTA ver como lo meto en el estado 
            // console.log ("Consolog de Estado del getProductos")
            // setArrayProductos(json.data.data)  //esto va a hacer que se vuelva a renderizar el componenete
            // console.log (arrayProductos)
            // console.log ((arrayProductos.length))

            //  alert("Termino el fetch");

            //Va a Rendierizar los productos en el DOM
            // renderProductos(arrayProductos);
            console.log("Acá tendria que ir a renderizar los productos disponibles para la venta recien recuperados")
            }
        } catch( error ) {
            alert("Error devuelto por el 'getProductos': " + error);
            if (error = "TypeError: Cannot read properties of undefined (reading 'data')") {
                alert ("Seguramente el Token ha expirado o no esta funcionando el BackEnd. \n Pruebe Loguearse nuevamente!")
                window.location.replace("../Login/login.html")
            }
        }
    }

    // Procedimiento: Recupera los Productos del BackEnd
    const getCarritoUsuarioLoguedo = () => {
        
        try {
            console.log ("Aca está yendo ir a recuperar el carrito del usuario loguedo y acto seguido si hay halgo renderizarlo")
            //Recupero el Carrito del usuario por si hubiese tenido alguno
            //   2 Evaluo si tengo carrito para el usuario activo ----------------------- 
            //   alert ("longitu de myCart: " + myCart.length); 
            myCart1 = JSON.parse(localStorage.getItem("myCart" + lsEmail));
            //Si hay un carrito con cosas pre-existente para el usuario
            console.log ("myCart1 ------------------------> abajo");
            console.log (myCart1);
            if (myCart1 != null) {
                //se lo asigno al carrito actua (myCart)
                myCart = myCart1;
                console.log ("myCart ------------------------> abajo");
                console.log(myCart);
            }

            //Si estoy arrancando con un carrito Pre-existente
            if (myCart) {
                //  alert ("va a ir a renderizar el carrito con " + myCart.lenght);
                // renderCartProducts();
                // showTotalAmount();
                setArrayCarrito(myCart); 
                CalculaTotalCarrito();

            } else {
                // alert ("el carrito arranca vacio ");
            }; 



        } 
        catch( error ) {
            alert("Error devuelto por el 'getCarritoUsuario': " + error);
        }
    }

    const CalculaTotalCarrito = () =>{
        console.log ("PASANDO POR CalcularTotalCarrito")
        let cantTotalArticulos = 0;
        let total = 0;
        myCart.forEach(cart => {
            console.log(cart);
            total += (cart.price * cart.quantity);
            cantTotalArticulos +=  cart.quantity;
        });
        setTotalCarrito(total)
        setCantTotArticulos(cantTotalArticulos)
    }

    const onClickComprar = (pObjProd, pIdProd) => {
        console.log("PASANDO POR el onClickComprar")
        const product = myCart.find(product => product.id === pIdProd); //y recupero el objeto del carrito de ese producto
        //si ese producto.id ya esta en el carrito?
        if(product) {
            console.log ("Ya esta el articulo en el carrito --> sumo 1")
            const index = myCart.indexOf(product);  //obtento el indice 
            product.quantity++;  //le sumo 1 a la cantidad del objeto Producto del carrito que acabo de buscar
            myCart[index] = product;  //le meto el elemento en nuevamente en ese indice con la cantidad nueva
            
            //y actualizo el estado del carrito
            setArrayCarrito(myCart)  //actualizo el estado            
            console.log (myCart);
        } else {
            console.log("NO esta en el carrito lo agrego")
            //si ese producto.id NO esta en el carrito
            const productToCart = {
                img: pObjProd.photo, 
                name: pObjProd.name,
                price: pObjProd.price,
                id: pIdProd,
                quantity:1
            };

            console.log ("No estaba el articulo en el carrito --> lo agrego")
            // agrego el producto nuevo en el carrito
            myCart.push(productToCart);
        }

        setArrayCarrito(myCart)  //actualizo el estado            
        console.log (myCart);
        // //Guardo el estado del Carrito (myCart) en el localStorage para el usuario actual
        //Guardo el estado del Carrito de usuario logueado (myCart) en el localStorage
        window.localStorage.setItem('myCart' + lsEmail, JSON.stringify(myCart));
        //     // ** para recuperarlo despues con:
        //     //       var data = JSON.parse(localStorage.getItem("myCart"));
        
        console.log(myCart)
        CalculaTotalCarrito();
        setArrayCarrito(myCart);  //==> esto deberia hacer que renderice el componente de nuevo 
                                  // renderCartProducts();
    }

    const onClickFinalizarCompra = () =>  {
        //El cliente esta finalizando la compra
       
        alert("¡¡ Gracias '" + lsEmail + "' por comprar en KIWI !! \nEl Total de su compra es:     $ " + totalCarrito + ". \nCon un total de  '" + cantTotArticulos + "'  artículos." );

        myCart = [];
        setArrayCarrito(myCart);
        CalculaTotalCarrito();
       
         //blanqueo el localStorage del carrito
        //  localStorage.setItem("myCart" + lsEmailUsLogueado, myCart);
         localStorage.removeItem("myCart" + lsEmail, myCart);
    }

    //Precondición siempre que entra a este componente hay un usuario logueado con Token activo.
    useEffect(() => {
         //recupero valores del storage primero
        lsEmail = localStorage.getItem('emailUsuario');
        lsToken = localStorage.getItem('token');  

        //Cargo los Prodcutos Disponibles para su compra
        getProductos();
        getCarritoUsuarioLoguedo();

    }, []); 
    // con el ", [])": --> se va a ejecutar 1 sola vez al principio



    return (

    <div className="Prd__Portada">
        <div className="Prd__Card">
            {/* <!-- <div className="Prd__ImagenUsuario">
                <img src="/Imagenes/LogoAlternativo.jpg" alt="Kiwi Mercado">
            </div> --> */}
            <div className="Prd__CntNuevaCuenta">
                <p>Productos Disponibles:</p>
                {/* <!-- Debio ser un form pero como el action aun no se JS: no funciona los botones para volver: entonces pongo un div--> */}
                <section className="Prd__listProducts" id="listProducts">
                    <div className="Prd__principalWrapper">
                        {/* <!-- <h2>Acá va la lista de los Pédis</h2> --> */}
                        <ul id='products-container'>
                            {/* {alert("PASO POR ACA")} */}
                            {console.log("ACA VA EL arrProd")}
                            {console.log("Longitud del ESTADO arrayProductos: --> " + arrayProductos.length)}
                            {/* Mapeo los productos en 1 card para cada uno */}
                            {arrayProductos.map( ( p, i)  => 
                            <li key={i}>
                                <div>
                                    {/* <img src="./assets/img/squirtle.png" alt="Squirtle"/> */}
                                    <img width="80px" height="80px" src={p.photo} alt="Squirtle"/>
                                </div>
                                <span>{p.name}</span>
                                <span className="Prd__Dsc">{p.description}</span>
                                <span>$ {p.price}</span>
                                <button onClick={() => onClickComprar(p, p.id)} >Comprar</button>
                            </li> 
                            )}
                            {/* FIN Mapeo los productos en 1 card para cada uno */}
                        </ul>

                        {/*                                                 
                        <ul id='products-container'>
                            <li>
                                <div>
                                    <img src="./assets/img/squirtle.png" alt="Squirtle"/>
                                </div>
                                <span>Limon Verde</span>
                                <span className="Prd__Dsc">Descripción del Limón .</span>
                                <span>758$</span>
                                <button>Comprar</button>
                            </li>
                            <li>
                                <div>
                                    <img src="./assets/img/pinguino.png" alt="Pinguino"/>
                                </div>
                                <span>el pajaro caniggia</span>
                                <span>912$</span>
                                <button className="Prd__disabled">Comprar</button>
                                <div className="Prd__outStock"><strong>sin stock. voló</strong></div>
                            </li>
                        </ul> */}
                    </div>
                </section>

                <section className="Prd__cartList" id="cartList">
                    <div className="Prd__principalWrapper">
                        <h2>Productos que están en el Carrito:</h2>
                        {/* <!-- <p>
                            Estaría piola en el navbar, tipo sidebar se abra... <br>
                            Pero como dicen las malas lenguas: "Mientras funcione"
                        </p> --> */}
                         {/* <!-- Aca van a ir los renderizados --> */}       
                        <div className="Prd__cart-wrapper">
                            <div id='cart-list'>

                                {arrayCarrito.map( (p, i) => 
                                    <div key={i} className="Prd__cart-item">
                                        <div className="Prd__cart-item-content">
                                            <div>
                                                <img className="Prd__Img-Prod-Carri" 
                                                     src={p.img} alt={p.name}/>
                                            </div>
                                            <span> {`X ${p.quantity}`}</span>
                                            <span>- {p.name}  - ($ {p.price})</span>
                                        </div>
                                        <span>$ {p.price * p.quantity}</span>
                                    </div>
                                )}  
                            </div>   
                            {/* -- Estos de abjo deberian estar comentados -- */}
                             {/* <!-- <div className="Prd__cart-item">
                                <div className="Prd__cart-item-content">
                                    <div className="Prd__item-img">
                                        <img src="./assets/img/squirtle.png" alt="Squirtle">
                                    </div>
                                    <span>- Coso de vamo a calmarno</span>
                                </div>
                                <span>$758</span>
                            </div> --> */}
                            {/* <!--
                            <div className="Prd__cart-item">
                                <div className="Prd__cart-item-content">
                                    <div className="Prd__item-img">
                                        <img src="./assets/img/balbasaur.png" alt="Balbasaur">
                                    </div>
                                    <span>- La Tortuga Franklin</span>
                                </div>
                                <span>$125</span>
                            </div> --> */}
                            <div className="Prd__total-items">
                                <span>
                                    <strong>Total:</strong> <b id='totalAmount'>$ {totalCarrito}</b>
                                </span>
                            </div>
                            <button className="Prod_btnFinalizarCompra" type="button" id='btnFinalizarCompra' 
                                    onClick={() => onClickFinalizarCompra()} >Finalizar compra</button>
                        </div>
                    </div>
                </section>

                    <div className="Prd__DivBotonera">
                        <div className="Prd__BotonAlta">
                            <a className="Prd__AHref_Submit" href="../../index.html"><button className="Prd__Submit" type="submit" > <ins>V</ins>olver</button></a>
                        </div>
                        {/* <div className="Prd__BotonAlta">
                            <a className="Prd__AHref_submit" href="../../index.html"><button className="Prd__Submit" type="submit" ><ins>C</ins>ancelar</button></a>
                        </div> */}
                    </div>
            </div>
        </div>    
    </div>
    // </div>    



    )
}

export default Products
