import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { getUsuarios,deleteUsuario  } from '../../data/usuarios'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'


const Mostrar = () => {
    const [conserjes, setConserjes] = useState([{
        id: '',
        rut: '',
        nombre: '',
        domicilio: '',
        email: '',
        numero: '',
    }])
    const router = useRouter()

    const delUser = async (id) => {
        //e.preventDefault()
        const response = await deleteUsuario(id,1)
        if (response.status === 200)
        console.log("Eliminado")
    }

    const confirmDelete = async (id) => {
        Swal.fire({
            title: 'Esta seguro que quiere eliminar este usuario?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Sis',
            denyButtonText: 'NoN',
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isDenied) {
                Swal.fire('No se elimino el usuario')
                return
            }else if (result.isConfirmed) {
                delUser(id)
                Swal.fire({
                    title:'Eliminado', 
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                    router.reload()})            
            } 
            }
        )
    }
    
    const contentTable = () => {
        return conserjes.map(conserje => {
            return (
                <Tr key={conserje._id}>
                    <Td>{conserje.nombre}</Td>
                    <Td>{conserje.rut}</Td>
                    <Td>{conserje.email}</Td>
                    <Td>{conserje.numero}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editar/${conserje._id}`)}>Modificar</Button>                   
                            <Button colorScheme={"teal"} onClick={() => confirmDelete(conserje._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getUsuarios().then(res => {
            setConserjes(res.data)
        })
    }, [])


    return (
        <> 
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Seleccione un conserje</Heading>
                <Button variant='outline' spacing='1000' onClick={()=> router.push('../dashboard')}>Atras</Button>
                <Stack spacing={4} mt="10">
                    <Table variant="simple">     
                        <Thead>
                            <Tr>
                                <Td>Nombre</Td>
                                <Td>RUT</Td>
                                <Td>E-mail</Td>
                                <Td>Numero</Td>
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

export default Mostrar