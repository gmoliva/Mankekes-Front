import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody, FormControl, FormLabel } from '@chakra-ui/react'
//import { getProducts } from '../data/products'
import { useRouter } from 'next/router'
import { login } from '../data/conserjes'

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
			localStorage.setItem('token', rut)
			localStorage.setItem('userType', response.data.user)
			
			//console.log(response.data.user)
			if(response.data.user == 1){
				router.push('./success')
			} else if(response.data.user == 0){
				router.push('./dashboard')

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