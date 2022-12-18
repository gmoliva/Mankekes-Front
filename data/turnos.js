import axios from 'axios';


const getTurnos = async () => {
    const response = await axios.get(`http://localhost:5000/api/Turno`)
    return response
    
}


module.exports = {
    getTurnos
}
