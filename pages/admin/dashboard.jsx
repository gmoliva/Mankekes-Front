import { Container, HStack, Input } from '@chakra-ui/react'
import React from 'react'
import { Button} from '@chakra-ui/react'
import { isAdmin } from '../../data/usuarios'
import { useRouter } from 'next/router'

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
            <Button onClick={() => router.push('./turnos')}>Crear Turnos</Button>
        </HStack>
        </Container>
    )
}

export default adminDashboard