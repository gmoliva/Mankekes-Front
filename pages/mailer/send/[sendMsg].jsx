import { useState } from 'react'
import { getUsuario } from '../../../data/usuarios'
import { sendMail } from '../../../data/mailer'
import { Button, Container, Heading, HStack, Stack } from '@chakra-ui/react'
import TextareaInput from '../../../components/TextareaInput'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.sendMsg)
    return {
        props: {
            data: response.data
        }
    }
}

const Message = ({ data }) => {
    const [conserje, setConserje] = useState(data)
    const router = useRouter()
    //const { cons } = router.query

    const handleChange = (e) => {
        setConserje({
            ...conserje,
            [e.target.name]: e.target.value
        })

    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if(!conserje.message)
        {
            return Swal.fire({
                icon: 'error',
                title: 'Campo incompleto',
                showConfirmButton: true,
                text: 'El campo de mensaje no puede estar vacío.'
            }).then(() => {
                console.log("aweonao")
            })
        }

        const response = await sendMail(localStorage.getItem("token"), conserje.email, conserje.message)


        if (response.status === 202) {
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                showConfirmButton: true,
                text: 'Correo enviado correctamente a la dirección ' + conserje.email
            }).then(() => {
                router.push('/usuarios/mostrar')
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                showConfirmButton: true,
                text: 'NO AUTORIZADO'
            })
        }
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Enviar mensaje a: {conserje.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <TextareaInput label="Cuerpo" handleChange={handleChange} name="message" placeholder="Ingrese su mensaje aquí." value={conserje.message} />
            </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={sendMessage}>Enviar</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/usuarios/mostrar')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default Message