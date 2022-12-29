import { useState } from 'react'
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel } from '@chakra-ui/react'
import TextareaInput from '../../components/TextareaInput'
import  InputForm  from '../../components/InputForm'
import { createNovedad } from '../../data/novedades'
import Router from 'next/router'
import { useRouter } from 'next/router'
import {useEffect} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'


const addNovedad = () => {

    const [novedad, setNovedades] = useState({
        asunto: '',
        descripcion: '',
        idTurno: '',
        idUsuario: ''
    })

    const [usuarios, setUsuario] = useState ([])

    const obtenerUsuarios  = async () => {
        try{
            const resultado = await axios.get('http://localhost:5000/api/Usuario')
            setUsuario(resultado.data)
        }catch(error){
            console.log(error)
        }

    }

    useEffect (() =>{
        obtenerUsuarios()
    }, [])

    const handleChange = (e) => {
            setNovedades({
                ...novedad,
                [e.target.name]: e.target.value
            })
    }
    console.log(novedad)
    const submitNovedades =(e) => {
        e.preventDefault()
        let timerInterval
        createNovedad(novedad).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Novedad creada correctamente',
                    icon:'success',
                    timer:1000,
                    timerProgressBar: false,
                    showConfirmButton: false,

                    willClose: () =>{
                        clearInterval(timerInterval)
                    }
                })
                
                handleClick()
            }
            
        })


    }

    const handleClick = async event => {
        await delay(1300);
        Router.push (`./mostrar/${novedad.idTurno}`)
       // await delay(1100);
       // Router.reload()
      };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Novedad</Heading>
            <Button  variant='outline' onClick={()=> Router.push('../turnos/conserjeriaTurnos')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <InputForm label="Asunto" handleChange={handleChange} name="asunto" placeholder="Que sucedio?" type="text" value={novedad.asunto} />
                <TextareaInput label="Descripcion" handleChange={handleChange} name="descripcion" placeholder="Describa como sucedio el problema" type="text" value={novedad.descripcion} />
                <InputForm label="Id de Turno" handleChange={handleChange} name="idTurno" placeholder="Quien es usted?" type="text" value={novedad.idTurno} />
                <FormControl>
                    <FormLabel>Usuario</FormLabel>
                    <Select value={novedad.idUsuario} onChange={(event) =>setNovedades({ ...novedad, idUsuario: event.target.value })}>
                        {usuarios.map((usuario) =>(
                            <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                        ))}
                    </Select>
                </FormControl>
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Crear nueva novedad</Button>
        </Container>
    )
}

export default addNovedad