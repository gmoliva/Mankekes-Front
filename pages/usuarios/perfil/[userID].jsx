import {useState} from 'react'
import {useRouter} from 'next/router'
import Swal from 'sweetalert2'
import { Button, Box, Container, Heading,Stack, Card, CardHeader, CardBody, CardFooter, Text} from '@chakra-ui/react'
import { getUsuario,updateUsuario} from '../../../data/usuarios'

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.userID)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [usuario, setUsuario] = useState(data)
    const router = useRouter()
    const { userID } = router.query

    function validar(){

        var rut,nombre,domicilio,email,numero,tipoUsuario,estadoUsuario;
    
        rut = usuario.rut;
        nombre = usuario.nombre;
        domicilio = usuario.domicilio;
        email = usuario.email;
        numero = usuario.numero;
        tipoUsuario = usuario.tipoUsuario;
        estadoUsuario = usuario.estadoUsuario;

        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionDomicilio =/[a-zA-Z]+\s[A-Za-z0-9]+/;
        const expresionEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        if(rut === "" || nombre === "" || domicilio === "" || email === "" || numero === "" || tipoUsuario === "" || estadoUsuario === ""){
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionEmail.test(email)){
            alert("El email no es valido")
            return false;
        }else if(!expresionDomicilio.test(domicilio)){
            alert("El domicilio no valido")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    //console.log(usuario.rut)
    const submitUsuario =(e) => {
        e.preventDefault()

        const v = validar();

        if (v === false){
            //alert("Por favor ingresar de manera correcta los");
            console.log("mal")
        }else if (v === true){
            //e.preventDefault()
            console.log("bien")

            let timerInterval
        updateUsuario(userID,usuario).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Usuario actualizado correctamente',
                    icon:'success',
                    timer:1000,
                    timerProgressBar: false,
                    showConfirmButton: false,

                    willClose: () =>{
                        clearInterval(timerInterval)
                    }
                })              
                handleClick()
            }
        })
        }   
    }

    const handleClick = async event => {
        await delay(1300);
        router.push('../mostrar')
    };
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    
        
    return(   
        <Container maxW="container.xl" mt={10}>
            <Card>
                <CardHeader>
                    <Heading size='lg'>Mi Perfil</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        RUT
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                        {usuario.rut}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Nombre
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.nombre}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Domicilio
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.domicilio}
                        </Text>
                        
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Email
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.email}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Numero
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.numero}
                        </Text>
                    </Box>
                    
                    </Stack>
                </CardBody>
            </Card>
                
        </Container>
)
}

export default Editar
