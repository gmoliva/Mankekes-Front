import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Select, Stack, Box, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const NuevoTurno = () => {
  // Define el estado para cada campo del formulario
    const [fecha, setFecha] = useState('')
    const [tipo, setTipo] = useState('0')
    const [idUsuario, setIdUsuario] = useState('')
    const [horaEntrada, setHoraEntrada] = useState('')
    const [horaSalida, setHoraSalida] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)
  // Define la función que enviará la solicitud POST al servidor
const guardarTurno = async () => {
    try {
        await axios.post('http://localhost:5000/api/Turno', {
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
}

  // Define la función que maneja el evento de submit del formulario
const handleSubmit = (event) => {
    event.preventDefault()
    guardarTurno()
}

  // Obtiene la instancia de `useRouter` de NextJS para redirigir al usuario
const router = useRouter()

  // Define la función que maneja el evento de click del botón de cancelar
const handleAccept = () => {
    handleClose()
    router.push('../turnos/administracionTurnos')
}

const handleCancel = () =>{
    router.push('../turnos/administracionTurnos')
}

return(
    // arreglar  el center 
  <Box class="flex-1 items-center justify-center w-1.5">
    <form onSubmit={handleSubmit}>
        <Stack isInline={false}>
        <FormControl>
            <FormLabel>Fecha del Turno</FormLabel>
            <Input type="date" value={fecha} onChange={(event) =>
            setFecha(event.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel >Tipo de Turno</FormLabel>
            <Select value={tipo} onChange={(event) => setTipo(event.target.value)}>
                <option value='0'>Dia</option>
                <option value='1'>Noche</option>
            </Select>
        </FormControl>
        <FormControl>
            <FormLabel>ID de Usuario</FormLabel>
            <Input type="text" value={idUsuario} onChange={(event) =>
            setIdUsuario(event.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel>Horario de Entrada</FormLabel>
            <Input type="time" value={horaEntrada} onChange={(event) => setHoraEntrada(event.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel>Horario de Salida</FormLabel>
            <Input type="time" value={horaSalida} onChange={(event) => setHoraSalida(event.target.value)} />
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
        </Stack>
    </form>
    </Box>
)

}

export default NuevoTurno