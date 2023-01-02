import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Box, Button, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { getTurnosCurrentDate } from '../../data/turnos'

const AdminDashboard = () => {
    const router = useRouter()

    const [conserjes, setConserjes] = useState([{
        dia: '',
        noche: ''
    }])

    useEffect(() => {
        getTurnosCurrentDate().then(res => {
            setConserjes(res.data)
            
        })
    }, [])

    return (
        <Box marginTop={'5%'} width={'full'}>
                <Heading size='xl' marginBottom={'5%'} marginLeft={'5%'}>Bienvenido</Heading>
                <Container minW={'100%'}>

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 2fr))'>
            <Card>
                <CardHeader>
                <Heading size='md'>Turnos</Heading>
                </CardHeader>
                <CardBody>
                <Text>Ver turnos y conserjes asignados, crear nuevos turnos.</Text>
                </CardBody>
                <CardFooter>
                <Button onClick={() => router.push('../turnos/administracionTurnos')}>Ver aquí</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <Heading size='md'>Novedades de turnos</Heading>
                </CardHeader>
                <CardBody>
                <Text>Visualización de novedades registradas por conserjes en su turno.</Text>
                </CardBody>
                <CardFooter>
                <Button onClick={() => router.push('../novedades/novedad')}>Ver aquí</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <Heading size='md'>Mi Perfil</Heading>
                </CardHeader>
                <CardBody>
                <Text>Ver el perfil del usuario actual.</Text>
                </CardBody>
                <CardFooter>
                <Button onClick={()=> router.push(`/usuarios/perfil/${localStorage.getItem('token')}`)}>Ver aquí</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <Heading size='md'>Conserjes Hoy</Heading>
                </CardHeader>
                <CardBody>
                    <Heading size='sm'>Dia</Heading>
                    <Text marginBottom={'10%'}>{ conserjes.dia!=""? conserjes.dia : "No hay conserje asignado para este dia."}</Text>
                    <Heading size='sm'>Noche</Heading>
                    <Text marginBottom={'10%'}>{ conserjes.noche!=""? conserjes.noche : "No hay conserje asignado para esta noche."}</Text>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            </SimpleGrid>

        </Container>
            </Box>
    )
}


export default AdminDashboard