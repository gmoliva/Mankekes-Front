import React, { useState, useEffect } from 'react'
import { Container, Heading,  FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Select, Stack, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const NuevoTurno = () => {
    const [fecha, setFecha] = useState('')
    const [tipo, setTipo] = useState('0')
    const [idUsuario, setIdUsuario] = useState('')
    const [horaEntrada, setHoraEntrada] = useState('')
    const [horaSalida, setHoraSalida] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)

    const obtenerUsuarios = async () => {
        try{
            const resultado = await axios.get(`${process.env.SERVIDOR}/Usuario`)
            setUsuarios(resultado.data)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() =>{
        obtenerUsuarios()
    }, [])


const guardarTurno = async () => {
    if(validarHorario(tipo, horaEntrada) && validarHorarioSalida(tipo, horaEntrada, horaSalida) && validarHorariosDistintos(horaEntrada, horaSalida)){

        try {
            await axios.post(`${process.env.SERVIDOR}/Turno`, {
                fecha: fecha,
                tipo: tipo,
                idUsuario: idUsuario,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
            })
            setIsOpen(true)
        } catch (error) {
            console.error(error)
        }
    }else {
        setErrorMessage('Verifique los campos ingresados')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    guardarTurno()

}


const router = useRouter()

const handleAccept = () => {
    handleClose()
    router.push('../turnos/administracionTurnos')
}

const handleCancel = () =>{
    router.push('../turnos/administracionTurnos')
}

const validarHorario = (tipo, hora) => {
    if(tipo === '0'){
        return hora <= '12:00';
    }else if(tipo === '1'){
        return hora >= '12:00';
    }
    return true
}

const validarHorarioSalida = (tipo, horaEntrada, horaSalida) => {
    if(tipo === '0'){
        return horaSalida > horaEntrada;
    }
    return true;
}

const validarHorariosDistintos = (horaEntrada, horaSalida) => {
    return horaEntrada!== horaSalida;
}

return(
    <Container maxW="container.xl">
    <Heading as="h1" size="2xl" textAlign="center" mt="10">Nuevo Turno</Heading>
    <form onSubmit={handleSubmit}>
        <Stack isInline={false}>
        <FormControl>
            <FormLabel>Fecha del Turno</FormLabel>
            <Input type="date" value={fecha} onChange={(event) =>
            setFecha(event.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel >Tipo de Turno</FormLabel>
            <Select placeholder="Seleccione el tipo de turno" onChange={(event) => setTipo(event.target.value)}>
                <option value='0'>Dia</option>
                <option value='1'>Noche</option>
            </Select>
        </FormControl>
        <FormControl>
            <FormLabel>Usuario</FormLabel>
            <Select value={idUsuario} placeholder="Seleccione un Usuario" onChange={(event) => setIdUsuario(event.target.value)}>
                {usuarios.map((usuario) =>(
                    <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                ))}
            </Select>
        </FormControl>
        <FormControl isInvalid={!validarHorario(tipo, horaEntrada) || !validarHorariosDistintos(horaEntrada, horaSalida)}>
            <FormLabel>Horario de Entrada</FormLabel>
            <Input type="time" value={horaEntrada} onChange={(event) => setHoraEntrada(event.target.value)} onBlur={() => setHoraEntrada(horaEntrada)} />
            {!validarHorario(tipo, horaEntrada) && <FormErrorMessage>El horario de entrada es invalido para el tipo de turno seleccionado</FormErrorMessage>}
            {!validarHorariosDistintos(horaEntrada, horaSalida) && <FormErrorMessage>El horario de entrada debe ser mayor al horario de salida para el tipo de turno seleccionado</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={!validarHorarioSalida(tipo, horaEntrada, horaSalida) || !validarHorariosDistintos(horaEntrada, horaSalida)}>
            <FormLabel>Horario de Salida</FormLabel>
            <Input type="time" value={horaSalida} onChange={(event) => setHoraSalida(event.target.value)} onBlur={() => setHoraSalida(horaSalida)} />
            {!validarHorariosDistintos(horaEntrada, horaSalida) && <FormErrorMessage>El horario de salida no puede ser igual al horario de entrada</FormErrorMessage>}
            {!validarHorarioSalida(tipo, horaEntrada, horaSalida) && <FormErrorMessage>El horario de salida debe ser mayor al horario de entrada para el tipo de turno seleccionado</FormErrorMessage>}
        </FormControl>
        <Button type="submit" mr={4} colorScheme="teal">Guardar Turno</Button>
        <Button onClick={handleCancel} colorScheme="red">Cancelar</Button>
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Turno Guardado</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    El turno se ha guardado existosamente.
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={handleAccept}>
                        Aceptar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Modal isOpen={errorMessage !== ''} onClose={() => setErrorMessage('')}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Error</ModalHeader>
                <ModalBody>{errorMessage}</ModalBody>
                <ModalFooter>
                    <Button onClick={() => setErrorMessage('')}>Aceptar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </Stack>
    </form>
    </Container>
)

}

export default NuevoTurno