//Componente para instanciar la funcionalidad de axios
// Tiee que tenerse acceso al token que esta en el localStorage
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://back-sandbox.herokuapp.com/api',  //Este es el BackEnd prestado por el profe Juli.
   

    //# Cambio Version Ago2022 - kiwi-front
    //# Apunto a mi BackEnd del Ago2022 de Trabajo integrador FinalFinal
    baseURL: 'https://app-kiwi-backend.herokuapp.com/api',
    
    //Testing Backend function ok - URL:
    //  https://app-kiwi-backend.herokuapp.com/api/gustos  --> esto esta andando
    //  baseURL Local: 'http://localhost:3000/api',
});

console.log(". Estoy entrando al objeto axios, por poner el token en 'headers.Authorization'. El token es:", localStorage.getItem('token'))

//Si tiene token lo agrego al hedears.Authorization
if (localStorage.getItem('token') !== undefined ) {
    instance.interceptors.request.use( config => {
        const token = localStorage.getItem('token');
        console.log (". axios.js: Muestro el token capturado del local", token)
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}

export { instance };
