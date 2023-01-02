import { Container, Box, Button, SimpleGrid, Heading, Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'


const ConserjeDb = () => {
    const router = useRouter()
    return (
        <Box marginTop={'5%'} width={'full'}>
                <Heading size='xl' marginBottom={'5%'} marginLeft={'5%'}>Bienvenido</Heading>
                <Container minW={'100%'}>

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(280px, 2fr))'>
            <Card>
                <CardHeader>
                <Heading size='md'>Turnos</Heading>
                </CardHeader>
                <CardBody>
                <Text>Visualización de turnos que se le han asignado.</Text>
                </CardBody>
                <CardFooter>
                <Button onClick={() => router.push('/turnos/conserjeriaTurnos')}>Ver aquí</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <Heading size='md'> Mis novedades</Heading>
                </CardHeader>
                <CardBody>
                <Text>Visualización de novedades creadas por mí.</Text>
                </CardBody>
                <CardFooter>
                <Button onClick={() => router.push('/novedades/misnovedades')}>Ver aquí</Button>
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
            </SimpleGrid>


        </Container>
            </Box>
    )
}

export default ConserjeDb