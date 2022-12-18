import { useState } from 'react'
import { getUsuario } from '../../../data/usuarios'
import { sendMail } from '../../../data/mailer'
import { Button, Container, Heading, HStack, Stack } from '@chakra-ui/react'
import InputForm from '../../../components/InputForm'
import TextareaInput from '../../../components/TextareaInput'
import { useRouter } from 'next/router'
//import Swal from 'sweetalert2'
import Swal from 'sweetalert2';

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.sendMsg)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {
    const [conserje, setConserje] = useState(data)
    const router = useRouter()
    //const { cons } = router.query

    const handleChange = (e) => {
        setConserje({
            ...conserje,
            [e.target.name]: e.target.value
        })

    }

    const submitProduct = async (e) => {
        e.preventDefault()
        const response = await sendMail(localStorage.getItem("token"), conserje.email, conserje.message)
        if (response.status === 202) {
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                showConfirmButton: true,
                text: 'Mensaje enviado correctamente'
            }).then(() => {
                router.push('/mailer')
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
                <InputForm label="Email" handleChange={handleChange} name="email" placeholder="Correo" value={conserje.email} />
                <TextareaInput label="Cuerpo" handleChange={handleChange} name="message" placeholder="Mensaje" value={conserje.message} />
            </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Editar producto</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/mailer')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default Editar