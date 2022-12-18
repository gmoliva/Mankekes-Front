import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { getUsuarios } from '../data/usuarios'
import { useRouter } from 'next/router'

const Mailer = () => {

    const [usuarios, setUsuarios] = useState([{
        id: '',
        rut: '',
        nombre: '',
        domicilio: '',
        email: '',
        numero: '',
    }])
    const router = useRouter()

    const contentTable = () => {
        return usuarios.map(usuario => {
            return (
                <Tr key={usuario._id}>
                    <Td>{usuario.nombre}</Td>
                    <Td>{usuario.rut}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./success`)}>Ver</Button>
                            <Button colorScheme={"teal"} onClick={() => router.push(`./mailer/send/${usuario._id}`)}>Enviar mensaje</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getUsuarios().then(res => {
            setUsuarios(res.data)
        })
    }, [])


    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Seleccione un usuario</Heading>
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