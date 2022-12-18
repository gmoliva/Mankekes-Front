import {useState} from 'react'
import {useRouter} from 'next/router'
import Router from 'next/router'
import TextareaInput from '../../../components/TextareaInput'
import Swal from 'sweetalert2'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel,Input} from '@chakra-ui/react'
import { getUsuario,updateUsuario} from '../../../data/usuarios'

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.producto)
    return {
        props: {
            data: response.data
        }
    }
}

const editar = ({ data }) => {

    const [usuario, setUsuario] = useState(data)
    const router = useRouter()
    const { producto } = router.query

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }


    const submitUsuario =(e) => {
        e.preventDefault()

        let timerInterval
        updateUsuario(producto,usuario).then(res => {
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

    const handleClick = async event => {
        await delay(1300);
        router.push('../mostrar')
    };
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    
        return(
        
            <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar Usuario: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <TextareaInput label="Rut" handleChange={handleChange} name="rut" placeholder="Actualizar rut" type="text" value={usuario.rut}/>
                <TextareaInput label="Nombre" handleChange={handleChange} name="nombre" placeholder="Actualizar nombre" type="text" value={usuario.nombre}/>
                <TextareaInput label="Domicilio" handleChange={handleChange} name="domicilio" placeholder="Actualizar domicilio" type="text" value={usuario.domicilio}/>
                <TextareaInput label="Email" handleChange={handleChange} name="email" placeholder="Actualizar email" type="text" value={usuario.email}/>
                <TextareaInput label="Numero" handleChange={handleChange} name="numero" placeholder="Actualizar numero" type="number" value={usuario.numero}/>
                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.tipoUsuario}>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Conserje</option>
                    </Select>
                </FormControl> 

                <FormControl id="estadoUsuario"> 
                    <h1>Estado del usuario</h1>
                    <Select name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.estadoUsuario}>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Desvinculado de la empresa</option>
                    </Select>
                </FormControl> 
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitUsuario}>Modificar Usuario</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
        </Container>
)
}

export default editar

/*return(
    <div>
    {data.nombre}
    </div> 
    )

    rut:'',
        nombre:'',
        domicilio:'',
        email:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:''

*/

