import {
Box,
Button,
Drawer,
DrawerContent,
DrawerOverlay,
Flex,
Icon,
Text,
useDisclosure,
Container,
HStack,
useMediaQuery,
useColorMode,
useColorModeValue
} from "@chakra-ui/react";
import { FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import React from "react";
import { useRouter } from "next/router";

//const colorTexto = useColorModeValue('red', 'blue');

export default function Sidebar(){
const sidebar = useDisclosure();

const router = useRouter()

const NavItem = (props) => {
const { icon, children, ...rest } = props;



return (
<Flex align="center" px="4" mx="2" rounded="md" py="3" cursor="pointer"  _hover={{
            bg: "blackAlpha.300",
            
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

        <Text fontSize="2xl" ml="2"  fontWeight="semibold">
            Conserje
        </Text>
    </Flex>
    <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={MdHome} onClick={() => router.push('./home') }>Home</NavItem>
        <NavItem icon={FaRss} onClick={() => router.push('./turnos/conserjeriaTurnos')}>Turnos</NavItem>
        <NavItem icon={HiCollection}>Mis Novedades</NavItem>
        <NavItem icon={FaClipboardCheck}>Perfil</NavItem>
        <NavItem icon={HiCode}>Integrations</NavItem>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
    </Flex>
</Box>
);
   
const [isMobile] = useMediaQuery('(max-width: 600px)');

if(!isMobile)
return (
    

        <Container>
    <SidebarContent display={{ base: "none", md: "unset" }} />
    <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" colorScheme='black'>
        <DrawerOverlay/>
        <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
    </Drawer>
</Container>
);
else
return (
    

    <Container>
<SidebarContent display={{ base: "none", md: "unset" }} />
<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" colorScheme='black'>
    <DrawerOverlay/>
    <DrawerContent>
        <SidebarContent w="full" borderRight="none" />
    </DrawerContent>
</Drawer>
</Container>
);
};

