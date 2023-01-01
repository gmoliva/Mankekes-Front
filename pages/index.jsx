import { useState } from 'react'
import { Button, Container, Heading, Input, Stack, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login,isAdmin,getUsuario} from '../data/usuarios'
const Index = () => {

	const [rut, setRUT] = useState('')
	const router = useRouter()

	const handleChange = (e) => {
		setRUT(e.target.value)
	}

	const toast = useToast()

	const onSubmit = async (e) => {
		e.preventDefault()
		const response = await login(rut)
		if (response.status === 200) {
			//localStorage.setItem('token', rut)
			
			const usrType = await isAdmin(rut)

			const usrState = await getUsuario(usrType.data.userId)
			
			if(usrState.data.estadoUsuario === 0){

				localStorage.setItem('token', usrType.data.userId)
			//console.log(response.data.user)
			if(usrType.status === 202){
				localStorage.setItem('userType', 0)
				router.push('./admin/dashboard')
			} else if(usrType.status === 200){
				localStorage.setItem('userType', 1)
				router.push('./conserje/home')
			}}else {
				toast({
					title: 'Login invalido',
					description: "El rut que ingreso no corresponde a empleados activos de la empresa.",
					status: 'error',
					duration: 2000,
					isClosable: false,
				  })				
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