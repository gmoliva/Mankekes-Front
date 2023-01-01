import { Button,ButtonGroup, Container, Heading, Input, Stack, Table, Tbody,Tr, Td, Thead, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getNovedadesFrom,deleteNovedad } from '../../../data/novedades'
import Swal from 'sweetalert2'



const Novedad = () => {
    const [novedad, setNovedades] = useState([{
        id: '',
        tipo: '',
        asunto: '',
        descripcion: '',
        idTurno: '',
        idUsuario: '',
    }])
    const router = useRouter()

    
    const delNovedad = async (id) =>{
        const response = await deleteNovedad(id)
        
    }

    const confirmDelete = async (id) => {
        Swal.fire({
            title:"Desea eliminar esta novedad?",
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isDenied) {
                Swal.fire("No se elimino la novedad")
                return
            }else if (result.isConfirmed){
                delNovedad(id)
                Swal.fire({
                    title:'Eliminado',
                    icon:'info',
                    showConfirmButton: true
                }).then((result) =>{
                    if (result.isConfirmed)
                    router.push('../../turnos/conserjeriaTurnos')})
            }
        }
        )
    }
    

    const contentTable = () => {
        return novedad.map(novedad => {
            return (
                <Tr key={novedad._id}>
                    <Td>{novedad.tipo.toString().replace("0","Novedad").replace("1","Justificacion")}</Td>
                    <Td>{novedad.asunto}</Td>
                    <Td>{novedad.descripcion}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`../editar/${novedad._id}`)}>Modificar</Button>
                            <Button colorScheme={"teal"} onClick={() => confirmDelete(novedad._id)} >Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }
    const rt = useRouter();
    



    useEffect(() => {
        getNovedadesFrom(rt.query.idturno).then(res => {
            setNovedades(res.data)
        })
    }, [])


    return (
        <> 
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Novedades de turno</Heading>
                <ButtonGroup variant='outline' spacing='1000'>
                <Button onClick={()=> router.push(`../../turnos/conserjeriaTurnos`)}>Atras</Button>
                <Button colorScheme='green' onClick={()=> router.push(`../crear/${rt.query.idturno}`)}>Agregar novedades</Button>
                </ButtonGroup>
                        
                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Tipo</Td>
                                 <Td>Asunto</Td>
								 <Td>Descripcion de la novedad</Td>
								 <Td>Acciones</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {contentTable()}
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        </>
    )
}

export default Novedad