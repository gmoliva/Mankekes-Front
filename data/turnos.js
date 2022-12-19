import axios from 'axios';


const getTurnos = async () => {
    const response = await axios.get(`http://localhost:5000/api/Turno`)
    return response
    
}

const getTurnosFrom = async () => {
    let id = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:5000/api/Turno/getFromUser/${id}`)
    return response

}


module.exports = {
    getTurnos,
    getTurnosFrom
}
