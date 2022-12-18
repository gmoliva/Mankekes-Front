import axios from 'axios';
//import { get } from 'mongoose';

const login =  (rut) => {
    const response =  axios.post(`${process.env.SERVIDOR}/usuario/usr/login/`, { rut });
    console.log(`${process.env.SERVIDOR}/usuario/login/`, { rut })
    return response
}

const getUsuarios = async () => {
    const response = await axios.get(`http://localhost:5000/api/Usuario`)
    return response
    
}

const getConserjes = async () => {
    const response = await axios.get(`http://localhost:5000/api/Usuario/conserje`)
    return response
    
}

const getUsuario = async (id) => {
    console.log(id)
    const response = await axios.get(`http://localhost:5000/api/Usuario/search/${id}`)
    return response
    
}

const isAdmin = async () => {
    let rut = localStorage.getItem("token")
    const response = await axios.get(`http://localhost:5000/api/Usuario/query/${rut}`)
    return response
}

module.exports = {
    login,
    getUsuarios,
    getUsuario,
    getConserjes,
    isAdmin
}
/*
/ver/${conserje._id}

const getConserjes = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/products`);
    return response
}

const createProduct = (product, rut) => {
    const response = axios.post(`${process.env.SERVIDOR}/product`, {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        rut: rut
    });
    return response
}

const getProduct = async (id) => {
    console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/product/search/${id}`)
    return response
}

const updateProduct = (id, product) => {
    const response = axios.put(`${process.env.SERVIDOR}/product/update/${id}`, product)
    return response
}
module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct
}
*/