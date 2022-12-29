import React from 'react'
import { useRouter } from 'next/router'
import {  Button, Container, HStack, Input } from '@chakra-ui/react'
import { isAdmin } from '../../data/usuarios'


const adminDashboard = () => {

    const router = useRouter()

    const onSubmit = async (e) => {
		e.preventDefault()

		let rut = localStorage.getItem('token')

		//localStorage.setItem('userType', response.data.user)
		const usrType = await isAdmin(rut)
		//console.log(response.data.user)
		if(usrType.status === 202){
			router.push('../mailer')
		} else if(usrType.status === 200){
			router.push('../404')
		}
	}

    return (
        <Container>
        <div>
            <h1>This is the admin landing page</h1>
        </div>
        <HStack>
            <Button onClick={onSubmit}>Enviar mensajes</Button>
            <Button onClick={() => router.push('../turnos/administracionTurnos')}>Crear Turnos</Button>
            <Button colorScheme={"teal"} onClick={() => router.push('../usuarios/crear')} >Crear usuario</Button> 
            <Button colorScheme={"teal"} onClick={() => router.push('../usuarios/mostrar')}>Ver empleados</Button>
        </HStack>
        </Container>
    )
}


export default adminDashboard