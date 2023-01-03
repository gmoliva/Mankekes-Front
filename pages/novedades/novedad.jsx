import { Button,ButtonGroup, Container, Heading, Stack, Table, Tbody,Tr, Td, Thead, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getOnlyNovedades } from '../../data/novedades'

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


    const contentTable = () => {
        return novedad.map((novedad,index) => {
            return (
                <Tr key={index}>
                    <Td>{novedad.tipo.toString().replace("0","Novedad").replace("1","Justificacion")}</Td>
                    <Td>{novedad.asunto}</Td>
                    <Td>{novedad.descripcion}</Td>
                    <Td>{novedad.idTurno?.fecha?.substring(0,10)}</Td>
                    <Td>{novedad.idTurno?.tipo?.toString().replace("0","Dia").replace("1","Noche")}</Td>
                    <Td>{novedad.idUsuario?.nombre}</Td>
                </Tr>
            )
        })
    }

    useEffect(() => {
        getOnlyNovedades().then(res => {
            const sortedNovedad = res.data.sort(CompararDescendente);
            setNovedades(sortedNovedad);
            router.push('./novedad')
        })
    }, [])


        const CompararAscendente = (a, b) => {
         const dateA = new Date(a.idTurno?.fecha);
         const dateB = new Date(b.idTurno?.fecha);
            return dateA - dateB;
         }

        const CompararDescendente = (a, b) => {
        const dateA = new Date(a.idTurno?.fecha);
        const dateB = new Date(b.idTurno?.fecha);
        return dateB - dateA;
         }
    
          // Sort the novedad array in ascending order
          const Ascendente = () => {
            const sortedNovedad = novedad.sort(CompararAscendente);
            setNovedades(sortedNovedad);
            router.push('./novedad')
            }

            // Sort the novedad array in descending order
            const Descendente = () => {
            const sortedNovedad = novedad.sort(CompararDescendente);
            setNovedades(sortedNovedad);
            router.push('./novedad')
            }
    
    return (
        <> 
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Novedades de turno</Heading>
                <ButtonGroup variant='outline' spacing='10'>
                <Button onClick={()=> router.push('../admin/dashboard')}>Atras</Button>
                <HStack spacing={10} margin='10'>
                <Button size='sm' colorScheme='red' onClick={Ascendente}>Ordenar fechas de menor a mayor</Button>
                <Button size='sm' colorScheme='green' onClick={Descendente}>Ordenar fechas de mayor a menor</Button>
                </HStack>
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
                                 <Td>Nombre del conserje</Td>
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