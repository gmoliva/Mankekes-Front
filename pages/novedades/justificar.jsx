import { useState } from 'react'
import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import TextareaInput from '../../components/TextareaInput'
import  InputForm  from '../../components/InputForm'
import { enviarJustificacion } from '../../data/novedades'
import Router from 'next/router'
//import { useRouter } from 'next/router'
import {useEffect} from 'react';


const justificar = () => {

    const [novedad, setNovedades] = useState({
        tipo: 1,
        asunto: 'JUSTIFICACION INASISTENCIA',
        justificacion: '',
        idTurno: '',
        idUsuario: ''
    })

    const handleChange = (e) => {
            setNovedades({
                ...novedad,
                [e.target.name]: e.target.value
            })
    }
   
    const submitNovedades =(e) => {
        e.preventDefault()
        enviarJustificacion(novedad.idUsuario,novedad)
        handleClick()

    }

    const handleClick = async event => {
        Router.push ('./novedad')
        await delay(100);
        Router.reload()
      };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Novedad</Heading>
            <Stack spacing={4} mt={10}>
                <TextareaInput label="Descripcion" handleChange={handleChange} name="justificacion" placeholder="Explique por que no puede asistir." type="text" value={novedad.justificacion} />
                <InputForm label="Id de turno" handleChange={handleChange} name="idTurno" placeholder="A que turno no ira?" type="text" value={novedad.idTurno} /> 
                <InputForm label="Id de Usuario" handleChange={handleChange} name="idUsuario" placeholder="Quien es usted?" type="text" value={novedad.idUsuario} /> 
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Crear nueva novedad</Button>
        </Container>
    )
}

export default justificar