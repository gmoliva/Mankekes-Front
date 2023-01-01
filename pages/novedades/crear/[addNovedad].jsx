import { useState } from 'react'
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel } from '@chakra-ui/react'
import TextareaInput from '../../../components/TextareaInput'
import  InputForm  from '../../../components/InputForm'
import { createNovedad } from '../../../data/novedades'
import Router from 'next/router'
import { useRouter } from 'next/router'
import {useEffect} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'


const AddNovedad = () => {

    const [novedad, setNovedades] = useState({
        asunto: '',
        descripcion: '',
        idTurno:  '',
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

    function validar (){
        var asunto =document.getElementById("asunto").value

        if(asunto === ""){
            return false
        }return true;
    }

    const handleChange = (e) => {
            setNovedades({
                ...novedad,
                [e.target.name]: e.target.value
            })
    }

    const submitNovedades =(e) => {
        e.preventDefault()
        const a = validar();
        if (a === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe especificar un asunto'
            })
           
        }else if (a === true){
            let timerInterval
            novedad.idTurno = rt.query.addNovedad
            novedad.idUsuario = localStorage.getItem('token')
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
       


    }

    const handleClick = async event => {
        await delay(1300);
        Router.push (`../mostrar/${rt.query.addNovedad}`)
      };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      const rt = useRouter();

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Novedad</Heading>
            <Button  variant='outline' onClick={()=> Router.push('/turnos/conserjeriaTurnos')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl isRequired>
                    <FormLabel>Asunto</FormLabel>
                    <InputForm  handleChange={handleChange} name="asunto" placeholder="Que sucedio?" type="text" value={novedad.asunto} />
                </FormControl>
                <TextareaInput label="Descripcion" handleChange={handleChange} name="descripcion" placeholder="Describa como sucedio el problema" type="text" value={novedad.descripcion} />
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Crear nueva novedad</Button>
        </Container>
    )
}

export default AddNovedad