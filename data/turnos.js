import axios from 'axios';

const getTurnos = async () =>{
    const response = await axios.get(`${process.env.SERVIDOR}/Turno`)
    return response
}

const getTurno = async (id) =>{
    const response = await axios.get(`${process.env.SERVIDOR}/Turno/${id}`)
    return response
}

const updateTurno = async (id, turno) =>{
    const response = await axios.put(`${process.env.SERVIDOR}/Turno/${id}`, turno)
    return response
}
const getUsuario = async (id) => {
    //console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/search/${id}`)
    return response
}

const getTurnosFrom = async () => {
    let id = localStorage.getItem('token')
    const response = await axios.get(`${process.env.SERVIDOR}/Turno/getFromUser/${id}`)
    return response

}

module.exports = {
    getTurnos,
    getTurno,
    updateTurno,
    getUsuario,
    getTurnosFrom
}