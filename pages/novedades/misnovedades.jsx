import { Button,ButtonGroup, Container, Heading, Stack, Table, Tbody,Tr, Td, Thead} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getheNovedades } from '../../data/novedades'


const Minovedad = () => {
    const [novedad, setNovedades] = useState([{
        id: '',
        tipo: '',
        asunto: '',
        descripcion: '',
        idTurno: '',
        idUsuario: '',
    }])
    const router = useRouter()


    const contentTable = () => {
        return novedad.map((novedad,index) => {
            return (
                <Tr key={index}>
                    <Td>{novedad.tipo.toString().replace("0","Novedad").replace("1","Justificacion")}</Td>
                    <Td>{novedad.asunto}</Td>
                    <Td>{novedad.descripcion}</Td>
                    <Td>{novedad.idTurno?.fecha?.substring(0,10)}</Td>
                    <Td>{novedad.idTurno?.tipo?.toString().replace("0","Dia").replace("1","Noche")}</Td>
                </Tr>
            )
        })
    }

    useEffect(() =>{
        getheNovedades().then(res => {
            setNovedades(res.data)
        })
    }, [])

    
    return (
        <> 
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Mis novedades</Heading>
                <ButtonGroup variant='outline' spacing='1000'>
                </ButtonGroup>
                        
                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Tipo</Td>
                                 <Td>Asunto</Td>
								 <Td>Descripcion de la novedad</Td>
                                 <Td>Fecha de turno</Td>
                                 <Td>Tipo de turno</Td>
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

export default Minovedad