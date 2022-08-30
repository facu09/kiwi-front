import axios from 'axios';

export const login = ({ email, password }) => {
    
    // antes de usar axios el fetch manual----------------
    // return fetch ('http://reqres.in/api/login', {
    //     method: 'POST',
    //     body: JSON, stringify ({
    //         email, 
    //         password
    //     })     
    //como el return devuelve una sola cosas se podrian sacar las llaves.

    // Comentado para usar el backend de Juli
    // return axios.post('https://reqres.in/api/login', {
    //     email, 
    //     password
    // });

    return axios.post('https://back-sandbox.herokuapp.com/api/auth/login', {
        email, 
        password
    });


};



// traido de mi integrador html vanilla

// const response = await fetch('https://back-sandbox.herokuapp.com/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         });