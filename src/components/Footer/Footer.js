import './Footer.css';  // vinculo estilos en cascada
import '../../fontawesome/fontawesome-free-5.15.3-web/css/all.css'; //para poder usar los iconos de facebook, twitter y instagram 

const Footer = () => {
  return   <div>
    <footer>
      <div className= "conteiner-linea1-footer">
          {/* <div className= "container-rosario">
              <a href="https://www.rosario.gob.ar/web/" target="_blank">
                  <img className="fab MuniRos" src="/imagenes/RosarioLogo.png" alt="Logo Municipalidad de Rosario" >
              </a>
          </div>  */}

          <div className="container-icons">
              {/* El target="_blank" es un warning para react + vercel pero lo uso igual xque me */}
              <a href="https://www.facebook.com/kiwihelado/" target="_blank">
              {/* <a href="https://www.facebook.com/kiwihelado/"> */}
                  <i className="fab fa-facebook icon-facebook"></i></a>
              <a href="https://twitter.com/kiwihelados" target="_blank">
              {/* <a href="https://twitter.com/kiwihelados"> */}
                  <i className="fab fa-twitter icon-twitter"></i></a>
              <a href="https://www.instagram.com/kiwi.helados/" target="_blank">
              {/* <a href="https://www.instagram.com/kiwi.helados/"> */}
                  <i className="fab fa-instagram icon-instagram"></i></a>
          </div>
      </div>
       {/* <!-- segunda linea del footer --> */}
      {/* <!-- <div className="Contenedor-Version">ver 1.5</div> --> */}
      <div className="conteiner-linea1-footer Contenedor-Version">ver 3.03</div>
  </footer>

  {/* <!-- segunda linea del footer --> */}
  {/* <footer2>     
        <div className="Contenedor-Version">ver 1.12</div>
  </footer2> */}


    {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>    */}
    {/* Esto ya es es un js */}
    {/* <script src="./index.js"></script> */}
  </div>
};

export default Footer;