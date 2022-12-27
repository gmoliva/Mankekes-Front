import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody, FormControl, FormLabel } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login } from '../data/usuarios'
import { isAdmin } from '../data/usuarios'

const Index = () => {

	const [rut, setRUT] = useState('')
	const router = useRouter()

	const handleChange = (e) => {
		setRUT(e.target.value)
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		const response = await login(rut)
		if (response.status === 200) {
			//localStorage.setItem('token', rut)
			
			const usrType = await isAdmin(rut)
			
			localStorage.setItem('token', usrType.data.userId)
			//console.log(response.data.user)
			if(usrType.status === 202){
				router.push('./admin/dashboard')
			} else if(usrType.status === 200){
				router.push('./success')

			}
		}
	}

	return (
		<>
			<Container maxW="container.xl" centerContent>
				<Heading as="h1" size="2xl" textAlign="center" mt="10">Que usuario ingresara</Heading>
				<Stack my={5}>
					<FormControl>
						<FormLabel>Rut del usuario</FormLabel>
						<Input onChange={handleChange} />
					</FormControl>
					<Button onClick={onSubmit} >Ingresar</Button>
				</Stack>
			</Container>
		</>

	)
}

export default Index