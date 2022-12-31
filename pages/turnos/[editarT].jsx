import React, { useState,  useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ChakraProvider, Box, Container, Heading, FormControl, FormLabel, Input, FormErrorMessage, Select, Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton, Stack } from '@chakra-ui/react'
import moment from "moment";

export const getServerSideProps = async (context) => {
    const turnoResponse = await axios.get(`http://localhost:5000/api/Turno/${context.query.editarT}`)
    const usuariosResponse = await axios.get('http://localhost:5000/api/Usuario')
    return {
        props: {
            data: turnoResponse.data,
            usuarios: usuariosResponse.data
        }
    }
}

const EditarTurno = ({ data }) => {

    const [turno, setTurno] = useState(data)
    const router = useRouter()
    const { editarT } = router.query
    const [error, setError] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const obtenerTurno = async () => {
            const response = await axios.get(`http://localhost:5000/api/Turno/${editarT}`)
            setTurno(response.data)
        }
        obtenerTurno()
    }, [editarT])

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const response = await axios.get('http://localhost:5000/api/Usuario')
            setUsuarios(response.data)
        }
        obtenerUsuarios()
    }, [])

    const handleChange = (e) => {
        setTurno({
            ...turno,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const entrada = moment(`${turno.fecha} ${turno.entrada}`, "YYYY-MM-DD HH:mm").toDate();
        const salida = moment(`${turno.fecha} ${turno.salida}`, "YYYY-MM-DD HH:mm").toDate();

        if(!entrada || !salida) {
            setError("La entrada y salida deben ser fechas validas");
            return;
        }
        
        if (!turno.fecha || !turno.tipo || !turno.idUsuario || !turno.entrada || !turno.salida) {
            setError('Todos los campos son obligatorios')
            return
        }
        
        setTurno({
            ...turno,
            entrada,
            salida,
        });

        axios.put(`http://localhost:5000/api/Turno/${editarT}`, {
            ...turno,
            entrada,
            salida
        }).then(res =>{
            if(res.status === 200){
                setIsModalOpen(true)
            }
        })
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        router.push('../turnos/administracionTurnos')
    }

    const handleCancelClick = () => {
        router.push('../turnos/administracionTurnos')
    }

    return(
        <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mt="10">Editar Turno</Heading>
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Exito</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Los cambios se han guardado con exito.
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleModalClose}>Cerrar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <form onSubmit={handleSubmit}>
                <Stack isInline={false}>
                    <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="fecha">Fecha del turno</FormLabel>
                        <Input
                            type="date"
                            name="fecha"
                            id="fecha"
                            value={turno.fecha.substring(0,10)}
                            onChange={handleChange}
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="tipo">Tipo de turno</FormLabel>
                        <Select
                            name="tipo"
                            id="tipo"
                            value={turno.tipo}
                            onChange={handleChange}
                        >
                            <option value="0">Día</option>
                            <option value="1">Noche</option>
                        </Select>
                    <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="idUsuario">Usuario</FormLabel>
                        <Select
                            name="idUsuario"
                            id="idUsuario"
                            value={turno.idUsuario}
                            onChange={handleChange}
                            >
                            {usuarios.map(usuarios => (
                                <option key={usuarios._id} value={usuarios._id}>{usuarios.nombre}</option>
                            ))}
                        </Select>
                    <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="=entrada">Hora de entrada</FormLabel>
                        <Input
                            type="time"
                            name="entrada"
                            id="entrada"
                            value={turno.entrada}
                            onChange={handleChange}
                            />
                    <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!error}>
                        <FormLabel htmlFor="salida">Hora de salida</FormLabel>
                        <Input
                            type="time"
                            name="salida"
                            id="salida"
                            value={turno.salida}
                            onChange={handleChange}
                        />
                    <FormErrorMessage>{error}</FormErrorMessage>
                            </FormControl>
                    <Stack isInline>
                        <Button type="submit" colorScheme="green">
                            Guardar cambios
                        </Button>
                        <Button onClick={handleCancelClick}>Cancelar</Button>
                    </Stack>
                </Stack>
                </form>
        </Container>
    )
}

export default EditarTurno