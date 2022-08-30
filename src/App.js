// import logo from './logo.svg';
// import { useSelector } from 'react-redux';
import './App.css';   //css 
// importo componentes
// import Toast from './components/Toast/Toast'
// import NavBar from './components/NavBar/NavBar';
// import Footer from './components/Footer/Footer';
import Router from './Router/Router';

function App() {

  // const { message, isError, loading } = useSelector (sotre => sotre.apiReducer);

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* Aca podria usar dependiendo de Estados a traves de redux ==- mostrar diferentes NavBar */}
{/*       
      {loading && <div 
      style={{
        width:'100vw', height:'100vh', position: 'absolute', 
        backgroundColor: 'rgba(tr234,tr234,tr234,.4)' }}>
          Loading
      </div>}   */}

      {/* <header className='App-header'> */}
        {/* {isError && <Toast message={message}/>} */}
        {/* Mando el componente NavBar dentro del BrowserRoute del componente Router.js para poder usar en Navigate('ruta')*/}
        {/* <NavBar /> */} 
      
        <Router/>
       
         {/* Mando el componente Footer dentro del BrowserRoute del componente Router.js */}
        {/* <Footer /> */}
        
      {/* </header>   */}
        {/* El componente Login lo va a cargar la pagina a traves del router */}
        {/* de la clase agregada de Juli */}
        {/* <Login /> */}
      {/* </header> */}
    </div>
  );
}

export default App;
