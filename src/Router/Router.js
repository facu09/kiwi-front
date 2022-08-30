import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Products from "../pages/Products/Products"
import Lacteos from "../pages/Products/Lacteos"
import Verduras from "../pages/Products/Verduras"
import User from "../pages/User/User"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"


const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/home' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element= {<Register />} />
                <Route path='/user' element= {<User />} />
                
                <Route path='/products' element= {<Products />} >
                    {/* Esta linea del 'index' es el children por defecto cuando arranca */}
                    {/* <Route index element= {<Login/>} />   */}
                    <Route path='lacteos' element= {<Lacteos/>} />
                    <Route path='verduras' element= {<Verduras />} />
                </Route>
                <Route path='*' element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default Router
