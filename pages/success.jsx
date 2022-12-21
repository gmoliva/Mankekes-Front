import {
Avatar,
Box,
Button,
Drawer,
DrawerContent,
DrawerOverlay,
Flex,
Icon,
IconButton,
Input,
InputGroup,
InputLeftElement,
Text,
useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import React from "react";
import { useRouter } from "next/router";
import {  Container, HStack } from '@chakra-ui/react'

export default function App(){
const sidebar = useDisclosure();

const router = useRouter()

const NavItem = (props) => {
const { icon, children, ...rest } = props;
return (
<Flex align="center" px="4" mx="2" rounded="md" py="3" cursor="pointer" color="whiteAlpha.700" _hover={{
            bg: "blackAlpha.300",
            color: "whiteAlpha.900",
          }} role="group" fontWeight="semibold" transition=".15s ease" {...rest}>
    {icon && (
    <Icon mr="2" boxSize="4" _groupHover={{
                color: "gray.300",
              }} as={icon} />
    )}
    {children}
</Flex>
);
};

const SidebarContent = (props) => (
<Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="10" overflowX="hidden" overflowY="auto"
    bg="brand.600" borderColor="blackAlpha.300" borderRightWidth="1px" w="60" {...props}>
    <Flex px="4" py="5" align="center">

        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
            Conserje
        </Text>
    </Flex>
    <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={MdHome} onClick={() => router.push('./novedades/novedad') }>Home</NavItem>
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode}>Integrations</NavItem>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
    </Flex>
</Box>
);
return (
<Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
    <SidebarContent display={{ base: "none", md: "unset" }} />
    <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" colorScheme='black'>
        <DrawerOverlay />
        <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
    </Drawer>
    <Box ml={{ base: 0, md: 60 }} transition=".3s ease">


        <Box as="main" p="4">
            {/* Add content here, remove div below */}
            
            <Container borderWidth="4px" borderStyle="dashed" rounded="md" h="930" >
        <div>
            <h1 className="text-3xl font-bold underline">This is the admin landing page</h1>
        </div>
        <HStack>
            <Button colorScheme={"teal"} onClick={() => {}}>Enviar mensajes</Button>
            <Button colorScheme={"teal"} onClick={() => router.push('../usuarios/crear')} >Crear usuario</Button> 
            <Button colorScheme={"teal"} onClick={() => router.push('../usuarios/mostrar')}>Ver empleados</Button>
            <Button colorScheme={"teal"} onClick={() => router.push('../turnos/administracionTurnos')}>Administrar turnos</Button>
        </HStack>
        </Container>
        </Box>
    </Box>
</Box>
);
};