import axios from 'axios';

const getOnlyNovedades = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/novedad/sn/search`);
    return response
}

const createNovedad = (novedad) => {
    const response = axios.post(`${process.env.SERVIDOR}/novedad`, novedad)
    return response
}

const getNovedad = async (id) => {
   // console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/novedad/${id}`)
    return response
}

// cambiar tipo  id, novedad, ya que usamos JSON
const updateNovedad = (id, novedad) => {
    const response = axios.put(`${process.env.SERVIDOR}/novedad/${id}`, novedad)
    return response
}

const deleteNovedad = async (id) =>{
    const response = await axios.delete(`${process.env.SERVIDOR}/novedad/${id}`)
    return response
}
const enviarJustificacion = async (id,justificacion) => {
    const response = await axios.post(`${process.env.SERVIDOR}/novedad/justificar/${id}`, justificacion)
    return response
}

const getNovedadesFrom = async (id) => {
   // console.log(id)
    const response = await axios.get(`${process.env.SERVIDOR}/novedad/getFromNov/${id}`)
    return response
}

module.exports = {
    getOnlyNovedades,
    createNovedad,
    getNovedad,
    updateNovedad,
    deleteNovedad,
    enviarJustificacion,
    getNovedadesFrom
}