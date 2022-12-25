import { useState } from 'react'
import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import TextareaInput from '../../components/TextareaInput'
import  InputForm  from '../../components/InputForm'
import { createNovedad } from '../../data/novedades'
import Router from 'next/router'
//import { useRouter } from 'next/router'
import {useEffect} from 'react';


const addNovedad = () => {

    const [novedad, setNovedades] = useState({
        asunto: '',
        descripcion: ''
        //idTurno: '',
        //idUsuario: ''
    })

    const handleChange = (e) => {
            setNovedades({
                ...novedad,
                [e.target.name]: e.target.value
            })
    }
    console.log(novedad)
    const submitNovedades =(e) => {
        e.preventDefault()
        createNovedad(novedad)
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
                <InputForm label="Asunto" handleChange={handleChange} name="asunto" placeholder="Que sucedio?" type="text" value={novedad.asunto} />
                <TextareaInput label="Descripcion" handleChange={handleChange} name="descripcion" placeholder="Describa como sucedio el problema" type="text" value={novedad.descripcion} />
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Crear nueva novedad</Button>
        </Container>
    )
}

export default addNovedad