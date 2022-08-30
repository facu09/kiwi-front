import './SideBar.css';  // vinculo estilos
import '../../fontawesome/fontawesome-free-5.15.3-web/css/all.css'; //para poder usar estilos de Fontawesome

import logoKiwi from '../../Imagenes/LogoKiwi.jpg';

import { Link, Outlet, useNavigate } from 'react-router-dom'



import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"



const SideBar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
    }


return (
  <nav className="SB__sideBar">
    
    
    {/* <button>{navbarOpen ? "Close" : "Open"}</button> */}
    {/* <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button> */}

    <button onClick={handleToggle}>
      {navbarOpen ? (
        <MdClose style={{ color: "#fff", width: "30px", height: "30px" }} />
      ) : (
        <FiMenu style={{ color: "#7b7b7b", width: "30px", height: "30px" }} />
      )}
    </button>

    <ul className={`SB__menuNav ${navbarOpen ? " SB__showMenu" : ""}`}>...
    
        <li className="" ><a> Quienes somos</a></li>
        <li> dos de todos los dos </li>
        <li> cuatro de todos los 4 </li>

    </ul>

  </nav>
)

}


export default SideBar