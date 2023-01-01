import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createUsuario} from '../../data/usuarios'
import  Swal  from 'sweetalert2'
import {  validate, format } from 'rut.js'

const Usuarios = () => {

    const [Usuario, setProduct] = useState({
        rut:'',
        nombre:'',
        domicilio:'',
        email:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:''
    })

    const router = useRouter()

    function validar(){

        var rut,nombre,domicilio,email,numero,tipoUsuario,estadoUsuario;
    
        rut = document.getElementById("rut").value;
        nombre = document.getElementById("nombre").value;
        domicilio = document.getElementById("domicilio").value;
        email = document.getElementById("email").value;
        numero = document.getElementById("numero").value;
        tipoUsuario = document.getElementById("tipoUsuario").value;
        estadoUsuario = document.getElementById("estadoUsuario").value;
        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionDomicilio =/[a-zA-Z]+\s[A-Za-z0-9]+/;
        const expresionEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const expresionTelefono = /^\d{8}$/;

        if(rut === "" || nombre === "" || domicilio === "" || email === "" || numero === "" || tipoUsuario === "" || estadoUsuario === ""){
            return false;
        }else if(!validate(rut)){
            alert("El rut no es valido")
            return false;
        }else if(!validate(rut)){
            alert("El rut no es valido")
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
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono no valido(8 digitos maximos)")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: e.target.value
        })  
    }

    const handleChangeRut = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: format(e.target.value)
        })  
    }

    const submitProduct = (e) => {

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()
        createUsuario(Usuario).then(res => {
            //console.log(res.data.name)
        })
        
        
        Swal.fire({
            title: 'Se creo un nuevo usuario',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('../admin/dashboard')
            }
        })    
        }
        
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Usuario</Heading>
            <Button variant='outline' spacing='1000' onClick={()=> router.push('../admin/dashboard')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl id="rut" isRequired> 
                    <FormLabel>RUT</FormLabel>
                    <Input name="rut" placeholder="12.345.678-9" type="text" maxLength="12" onChange = {handleChangeRut}/>
                    {!validate(Usuario.rut) ? (
                        <FormHelperText>
                            Rut Invalido
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )}
                </FormControl> 

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input pattern="[a-zA-Z]+" name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="domicilio"> 
                    <FormLabel>Domicilio</FormLabel>
                    <Input name={"domicilio"} placeholder="Calle falsa 123" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="email"> 
                    <FormLabel>Email</FormLabel>
                    <Input name={"email"} placeholder="mail@gmail.com" type="email" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="numero"> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <Input name={"numero"} placeholder="12345678" type="tel" maxLength="8" onChange = {handleChange}/>   
                </FormControl> 

                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Conserje</option>
                    </Select>
                </FormControl> 

                <FormControl id="estadoUsuario"> 
                    <h1>Estado del usuario</h1>
                    <Select name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Desvinculado de la empresa</option>
                    </Select>
                </FormControl> 
                </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../admin/dashboard')}>Cancelar</Button>
            </HStack>
        </Container> 
    )
}

export default Usuarios