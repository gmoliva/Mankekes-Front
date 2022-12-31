import {useState} from 'react'
import { getNovedad,updateNovedad} from '../../../data/novedades'
import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import Router from 'next/router'
//import InputForm from '../../components/InputForm'
import TextareaInput from '../../../components/TextareaInput'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {

    const response = await getNovedad(context.query.novedades)
    return {
        props: {
            dat: response.data
        }
    }
}


const Editar = ({ dat }) => {
    const [novedad, setNovedades] = useState(dat)
    const router = useRouter()
    const { novedades } = router.query

    const handleChange = (e) => {
            setNovedades({
                ...novedad,
                [e.target.name]: e.target.value
            })
    }
    //console.log(novedad)
    const submitNovedades =(e) => {
        e.preventDefault()
        let timerInterval
        updateNovedad(novedades,novedad).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Novedad actualizada correctamente',
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
        console.log(router.query)
        await delay(1300);
        Router.push (`../mostrar/${novedad.idTurno}`)
        //await delay(1);
        //Router.reload()
      };
      
      const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    return(
        
          <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar descripcion de Novedad: {dat.asunto}</Heading>
            <Button  variant='outline' onClick={()=> Router.push(`../mostrar/${novedad.idTurno}`)}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <TextareaInput label="Descripcion" handleChange={handleChange} name="descripcion" placeholder="Actualice la descripcion" type="text" value={novedad.descripcion} />
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitNovedades}>Modificar Novedad</Button>
        </Container>

    )
}

export default Editar