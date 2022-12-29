import axios from 'axios';

const getTurnos = async () =>{
    const response = await axios.get(`http://localhost:5000/api/Turno`)
    return response
}

const getTurno = async (id) =>{
    const response = await axios.get(`http://localhost:5000/api/Turno/${id}`)
    return response
}

const updateTurno = async (id, turno) =>{
    const response = await axios.put(`http://localhost:5000/api/Turno/${id}`, turno)
    return response
}
const getUsuario = async (id) => {
    //console.log(id)
    const response = await axios.get(`http://localhost:5000/api/Usuario/search/${id}`)
    return response
}

const getTurnosFrom = async () => {
    let id = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:5000/api/Turno/getFromUser/${id}`)
    return response

}

module.exports = {
    getTurnos,
    getTurno,
    updateTurno,
    getUsuario,
    getTurnosFrom
}