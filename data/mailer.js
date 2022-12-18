import axios from 'axios';

const sendMail = async (id, mail, msg) => {
    console.log(id)
    let send = { "email": mail, "message":msg}
    const response = await axios.post(`http://localhost:5000/api/mailer/sendMail/${id}`,send)
    return response
}

module.exports = {
    sendMail
}