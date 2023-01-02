import React, { useEffect, useState } from 'react'
import { ChakraProvider, Box, Table, TableCaption, Thread, Tr, Th, Td, HStack, Button, Container, Heading, Stack, Thead, Tbody, Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton} from '@chakra-ui/react'
import { getTurnos } from '../../data/turnos'
import { useRouter } from 'next/router'
import axios from 'axios'

function getUsuarios(){
    return fetch('${process.env.SERVIDOR}/Usuario')
    .then(response => response.json())
}

const AdministracionTurnos = () => {

const [turnos, setTurnos] = useState([{
    fecha: '',
    tipo: '',
    idUsuario: '',
    entrada: '',
    salida: '',
}])
const [usuarios, setUsuarios] = useState({})
const router = useRouter()

function sortTurnosByDate(turnos){
    return turnos.sort((a, b) =>{
        const dateA = Date.parse(a.fecha);
        const dateB = Date.parse(b.fecha);
        return dateA - dateB;
    });
}

useEffect(() =>{
    getTurnos().then(res=>{
        const sortedTurnos = sortTurnosByDate(res.data);
        setTurnos(sortedTurnos);
    });

    getUsuarios().then(res => {
        const usuariosMap = {}
        if(res && res.data){
        res.data.forEach(usuario => {
            usuariosMap[usuario._id] = usuario
        })
    }
        setUsuarios(usuariosMap)
    })
}, [])
const contentTable = () => {
    
    return turnos.map((turno,index) => {
        const entrada = new Date(turno.entrada)
        entrada.setHours(entrada.getHours());

        const salida = new Date(turno.salida)
        salida.setHours(salida.getHours());
        return (
        <Tr key={index}>
            <Td>{turno.fecha.substring(0,10)}</Td>
            <Td>{turno.tipo.toString().replace("0","Dia").replace("1","Noche")}</Td>
            <Td>{entrada.toTimeString().substring(0,5)}</Td>
            <Td>{salida.toTimeString().substring(0,5)}</Td>
            <Td>{turno.idUsuario?.nombre}</Td>
            <Td>
            <HStack>
                <Button colorScheme={"orange"} onClick={() =>
                    router.push(`./${turno._id}`)}>
                        Editar Turno
                </Button>
            </HStack>
            </Td>
            <Td>
            <HStack>
                <Button colorScheme={"red"} onClick={() => {
                    openModal();
                    setId(turno._id);}}>Borrar Turno</Button>
            </HStack>
            </Td>
        </Tr>
    )
    })
}


const [isOpen, setIsOpen] = useState(false);
const [id,setId] = useState('');

const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false);

async function deleteTurno(id){
    try{
        await axios.delete(`${process.env.SERVIDOR}/Turno/${id}`);
        setTurnos(turnos.filter(turno => turno._id !== id));
    }catch (error){
        console.error(error);
    }
}

const handleAddTurno = () =>{
    router.push('./nuevo-turno')
}

return (
    <>
    <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mt="10">Admnistración de Turnos</Heading>
        <Button colorScheme="blue" mt="10" mb="10" onClick ={handleAddTurno}>Agregar Turno</Button>
        <Stack spacing={4} mt="10">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Td>Fecha del Turno</Td>
                        <Td>Tipo de Turno</Td>
                        <Td>Horario de entrada</Td>
                        <Td>Horario de salida</Td>
                        <Td>Conserje Encargado</Td>
                        <Td>Editar Turno</Td>
                        <Td />
                    </Tr>
                </Thead>
            <Tbody>
                    {contentTable()}
            </Tbody>
            </Table>
        </Stack>
    </Container>
    <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size="sm"
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirmar Eliminacion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>¿Estas seguro de querer eliminar el turno seleccionado?</ModalBody>
            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={() => {
                    deleteTurno(id);
                    closeModal();
                }}>
                    Eliminar
                </Button>
                <Button onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
)
}

export default AdministracionTurnos