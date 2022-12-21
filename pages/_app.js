import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Sidebar from '../components/Sidebar'
import { HStack } from '@chakra-ui/react'

function MyApp({Component, pageProps}) {
	const router = useRouter()
	//console.log(router.pathname)

	if(router.pathname === '/')
  	return ( 
		<ChakraProvider> 
			<Component {...pageProps} />
		</ChakraProvider>
	)
	else
	return ( 
		<ChakraProvider> 
			<HStack>
				<Component {...pageProps} />
				<Sidebar></Sidebar>
			</HStack>
		</ChakraProvider>
	)

}

export default MyApp