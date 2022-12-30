import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'



const conserjeDb = () => {
    const router = useRouter()
    return (
        <div>
            <h1>Buenas Conserje, que desea hacer hoy</h1>
                <Button colorScheme={"red"} onClick={() => router.push('./novedades/novedad')}>Novedades turno</Button>
                <Button colorScheme={"blue"} onClick={() => router.push('./novedades/justificar')}>Justificacion</Button>
                <Button colorScheme={"teal"} onClick={() => router.push('./turnos/conserjeriaTurnos')}>Ver mis turnos</Button>

        </div>
    )
}

export default conserjeDb