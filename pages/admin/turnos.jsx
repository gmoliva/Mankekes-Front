import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { getTurnos } from '../../data/turnos'
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
                    <Td>{}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./success`)}>Asignar</Button>
                            <Button colorScheme={"teal"} onClick={() => router.push(`./success`)}>Enviar recordatorio</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getTurnos().then(res => {
            setTurnos(res.data)
        })
    }, [])


    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Seleccione un turno</Heading>
                <Button colorScheme="blue" mt="10" mb="10" onClick={() => router.push('/product/crear')}>Agregar turno</Button>
                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Tipo</Td>
                                <Td>Fecha</Td>
                                <Td>ID Asignado</Td>
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

export default Turnos