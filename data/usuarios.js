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

const isAdmin = async () => {
    let rut = localStorage.getItem("token")
    const response = await axios.get(`http://localhost:5000/api/Usuario/query/${rut}`)
    return response
}


const getUsuario = async (id) => {
    //console.log(id)
    const response = await axios.get(`http://localhost:5000/api/Usuario/search/${id}`)
    return response
}

const createUsuario = (Usuario) => {
    //console.log(Usuario)
    const response = axios.post(`http://localhost:5000/api/Usuario/1`,Usuario);
    return response 
}


const deleteUsuario = (id,x) => {
    const response = axios.delete(`http://localhost:5000/api/Usuario/${id}/1`)
    return response
}

const updateUsuario = (id, usuario) => {
    const response = axios.put(`http://localhost:5000/api/Usuario//update/${id}/1`,usuario)
    return response
}


module.exports = {
    login,
    getUsuarios,
    getUsuario,
    getConserjes,
    isAdmin,
    createUsuario,
    deleteUsuario,
    updateUsuario
}
