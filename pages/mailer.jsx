import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { getConserjes } from '../data/conserjes'
import { useRouter } from 'next/router'

const Mailer = () => {

    const [conserjes, setConserjes] = useState([{
        id: '',
        rut: '',
        nombre: '',
        domicilio: '',
        email: '',
        numero: '',
    }])
    const router = useRouter()

    const contentTable = () => {
        return conserjes.map(conserje => {
            return (
                <Tr key={conserje._id}>
                    <Td>{conserje.nombre}</Td>
                    <Td>{conserje.rut}</Td>
                    <Td>{conserje.email}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./success`)}>Ver</Button>
                            <Button colorScheme={"teal"} onClick={() => router.push(`./mailer/send/${conserje._id}`)}>Enviar mensaje</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getConserjes().then(res => {
            setConserjes(res.data)
        })
    }, [])


    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Seleccione un conserje</Heading>
                <Button colorScheme="blue" mt="10" mb="10" onClick={() => router.push('/product/crear')}>Agregar producto</Button>
                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Nombre</Td>
                                <Td>RUT</Td>
                                <Td>E-mail</Td>
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

export default Mailer