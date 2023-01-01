import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'


const ConserjeDb = () => {
    const router = useRouter()
    return (
        <div>
            <h1>Buenas Conserje, que desea hacer hoy</h1>
                <Button colorScheme={"teal"} onClick={() => router.push('../turnos/conserjeriaTurnos')}>Ver mis turnos</Button>

        </div>
    )
}

export default ConserjeDb