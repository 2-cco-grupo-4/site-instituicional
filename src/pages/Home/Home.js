import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material"
import Container from "atoms/Container"
import CustomButton from "atoms/CustomButton"
import Header from "molecules/Header"
import PolaroidImage from "atoms/PolaroidImage"
import useStyles from "./Home.styles"
import { useTheme } from "@mui/styles"

import aniversario from 'assets/img/aniversario.jpg'
import baloes from "assets/img/baloes.jpg"
import bolo from "assets/img/bolo.jpg"
import brinde from "assets/img/brinde.jpg"
import buque from "assets/img/buque.jpg"
import casal from "assets/img/casal.jpg"
import criancaCasamento from "assets/img/crianca-casamento.jpg"
import fotografo from "assets/img/fotografo.jpg"
import senhorAniversario from "assets/img/senhor-aniversario.jpg"
import smartphone from "assets/img/usuario-smartphone.jpg"
import sobrinho from "assets/img/sobrinho.jpg"
import tacas from "assets/img/tacas.jpg"
import Footer from "molecules/Footer"
import CustomLogin from "molecules/CustomLogin/CustomLogin"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import handleOpen from "molecules/CustomLogin/CustomLogin"

const imageList = [
  {
    alt: "senhor-aniversario",
    src: senhorAniversario,
  },
  {
    alt: "baloes",
    src: baloes,
  },
  {
    alt: "brinde",
    src: brinde,
  },
  {
    alt: "casal",
    src: casal,
  },
  {
    alt: "sobrinho",
    src: sobrinho,
  },
  {
    alt: "bolo",
    src: bolo,
  },
  {
    alt: "buque",
    src: buque,
  },
  {
    alt: "tacas",
    src: tacas,
  },
  {
    alt: "crianca-casamento",
    src: criancaCasamento,
  },
]



const Separator = ({ title }) => {
  const classes = useStyles()

  return (
    <Box className={classes.separator} mb={3}>
      <Container alignItems="center" flexDirection="column" py={2}>
        <Typography id="galeria" variant="subtitle-small-bold" >
          {title}
        </Typography>
      </Container>
      <div className={classes.pointer} />
    </Box>)
}

const Home = () => {
  const classes = useStyles()
  const theme = useTheme()

  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack sx={{ transition: '2s all ease' }}>
      
      <Header type={1} />
      <Container
        alignItems="center"
        className={classes.banner}
      >
        <Stack
          spacing={2}
          flexDirection='column'
          alignItems="left"
          width="35%"
        >
          <Typography
            fontWeight="bold"
            color="white.main"
            fontSize={{lg: '48px', md: '48px', sm: '32px', xs: '24px'}}
          >
            Transforme sua paixão em sucesso
          </Typography>
          <CustomButton variant="contained">Começar!</CustomButton>
        </Stack>
      </Container>
      <Separator title="Galeria" id="galeria" />
      <Container pb={2}>
        <ImageList variant="masonry" cols={downSm ? 1 : 3} gap={8}>
          {imageList.map(({ index, alt, src }) => (
            <ImageListItem key={index}>
              <img src={src} alt={alt} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Separator title="Quem somos?"/>
      <Container
        id="quem-somos"
        alignItems="center"
        justifyContent="space-between"
        className={classes.section}
      >
        <Stack width={{lg: "50%", md: "50%", sm: "70%", xs: "90%"}}>
          <Typography variant="title-small-bold" mb={4} fontSize={{md: '32px', sm: '28px', xs: '24px'}}>
            Criamos conexões
          </Typography>
          <Typography>
            Nossa empresa nasceu com a ideia de conectar as pessoas com aquilo que elas procuravam, e após
            identificarmos uma necessidade de exisitir uma simplificação no processo de encontrar fotógrafos
            nós decidimos criar a Picme, um produto que busca colocar o trabalho do fotógrafo em evidência
            para o mundo, de forma que possíveis clientes possam encontrar seu trabalho em nossa plataforma
            e entrar em contato de forma imediata em busca de seu trabalho.
          </Typography>
        </Stack>
        <Box className={classes.pastedPhoto}>
          <Box width="70%">
            <PolaroidImage tilt="right" hasTapes>
              <img width={{lg: '50%', md: '70%'}} src={smartphone} alt="" />
            </PolaroidImage>
          </Box>
        </Box>
      </Container>
      <Container
        id="produto"
        alignItems="center"
        justifyContent="space-between"
        className={classes.sectionInvertida}
      >
        <Stack width={{lg: "50%", md: "50%", sm: "70%", xs: "90%"}}>
          <Typography variant="title-small-bold" mb={4}>
            Apoiando os 2 lados
          </Typography>
          <Typography>
            Nosso produto serve como a plataforma definitiva para um fotógrafo encontrar novos clientes e
            publicar seu trabalho, e também para pessoas interessadas encontrem fotógrafos para suas
            necessidades, com um sistema de busca por tags, o cliente consegue encontrar o fotógrafo ideal
            para seu evento.
          </Typography>
        </Stack>
        <Box className={classes.pastedPhoto}>
          <Box width="70%">
            <PolaroidImage tilt="left" hasTapes>
              <img src={fotografo} alt="" />
            </PolaroidImage>
          </Box>
        </Box>
      </Container>
      <Container
        id="explorar"
        alignItems="center"
        justifyContent="space-between"
        className={classes.section}
      >
        <Stack width={{lg: "50%", md: "50%", sm: "70%", xs: "90%"}}>
          <Typography variant="title-small-bold" mb={4}>
            Não Perca Tempo
          </Typography>
          <Typography mb={4}>
            Venha conhecer nossa plataforma e conhecer o trabalho de profissionais incriveis que estão
            totalmente ao seu alcance
          </Typography>
          <CustomButton color="primary" variant="contained">Explorar</CustomButton>
        </Stack>
        <Box className={classes.pastedPhoto}>
          <Box width="70%">
            <PolaroidImage tilt="right" hasTapes>
              <img src={aniversario} alt="" />
            </PolaroidImage>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </Stack>
  )
}

export default Home 