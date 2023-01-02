import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody } from '@chakra-ui/react'
import { getTurnosFrom } from '../../data/turnos'
import { useRouter } from 'next/router'

const Turnos = () => {

    const [turnos, setTurnos] = useState([{
        id: '',
        fecha: '',
        tipo: '',
        idUsuario: '',
    }])
    const router = useRouter()

    const contentTable = () => {
        return turnos.map(turno => {
            return (
                <Tr key={turno._id}>
                    <Td>{turno.tipo.toString().replace("0","Dia").replace("1","Noche")}</Td>
                    <Td>{turno.fecha.substring(0,10)}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`../novedades/mostrar/${turno._id}`)}>Mostrar Novedades</Button>
                            <Button colorScheme={"blue"} onClick={() => router.push(`../novedades/justificar/${turno._id}`)}>Justificacion</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getTurnosFrom().then(res => {
            setTurnos(res.data)
        })
    }, [])


    return (
        
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Seleccione un turno</Heading>         
                <Button  variant='outline' onClick={()=> router.push('../conserje/home')}>Atras</Button>                
                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Tipo</Td>
                                <Td>Fecha</Td>
                                <Td>Acciones</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {contentTable()}
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        

    )
}

export default Turnos