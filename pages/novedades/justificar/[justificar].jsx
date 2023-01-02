import { useState } from 'react'
import { Button, Container, Heading, Stack, FormControl, FormLabel  } from '@chakra-ui/react'
import TextareaInput from '../../../components/TextareaInput'
import { enviarJustificacion } from '../../../data/novedades'
import Router from 'next/router'
import Swal from 'sweetalert2'


const Justificar = () => {

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
    function validar (){
        
        var justificacion =document.getElementById("justificacion").value;

        if(justificacion === "" ){
            return false
        }
        return true;
    }

    const submitNovedades =(e) => {
        e.preventDefault()
        const a = validar();
        if (a === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe especificar el por que falta al turno'
            })
        }else if (a === true){
            let timerInterval
            novedad.idUsuario = localStorage.getItem('token')
            novedad.idTurno = Router.query.justificar

            enviarJustificacion(novedad.idUsuario,novedad).then(res => {
                if (res.status == 200){
                    Swal.fire({
                        title:'Justificacion creada correctamente',
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
        await delay(1000);
        Router.push (`/turnos/conserjeriaTurnos`)
        await delay(100);
      };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Panel de justificacion</Heading>
            <Button onClick={()=> Router.push('/turnos/conserjeriaTurnos')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl>
                    <FormLabel>Descripcion</FormLabel>
                    <TextareaInput  handleChange={handleChange} name="justificacion" placeholder="Explique por que no puede asistir." type="text" value={novedad.justificacion} />
                </FormControl>
            </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Crear justificacion</Button>
        </Container>
    )
}

export default Justificar