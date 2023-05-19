import { 
  Box, 
  ImageList, 
  ImageListItem, 
  Stack, 
  Typography
} from "@mui/material"
import Container from "atoms/Container"
import CustomButton from "atoms/CustomButton"
import Header from "molecules/Header"
import PolaroidImage from "atoms/PolaroidImage"
import useStyles from "./Home.styles"

import baloes from "assets/img/baloes.jpg"
import bolo from "assets/img/bolo.jpg"
import buque from "assets/img/buque.jpg"
import casal from "assets/img/casal.jpg"
import criancaCasamento from "assets/img/crianca-casamento.jpg"
import sobrinho from "assets/img/sobrinho.jpg"
import senhorAniversario from "assets/img/senhor-aniversario.jpg"
import tacas from "assets/img/tacas.jpg"
import brinde from "assets/img/brinde.jpg"
import smartphone from "assets/img/usuario-smartphone.jpg"

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

const Separator = ({title}) => {
  const classes = useStyles()

  return (
  <Box className={classes.separator} mb={3}>
    <Container alignItems="center" flexDirection="column" py={2}>
      <Typography id="galeria" variant="subtitleBold" >
        {title}
      </Typography>
    </Container>
    <div className={classes.pointer} />
  </Box>)
}

const Home = () => {
  const classes = useStyles()
  return (
    <Stack sx={{ transition: '2s all ease'}}>
      <Header />
      <Container 
      alignItems="center" 
      className={classes.banner}
      >
        <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="left" 
        width="35%"
        >
          <Typography
          fontSize="48px" 
          fontWeight="bold"
          mb={2}
          color="white.main"
          >
            Transforme sua paixão em sucesso
          </Typography>
          <CustomButton variant="contained">Começar!</CustomButton>
        </Box>
      </Container>
      <Separator title="Galeria" />
      <Container pb={2}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {imageList.map(({index, alt, src}) => (
            <ImageListItem key={index}>
              <img src={src} alt={alt} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Separator title="Quem somos?" />
      <Container 
      flexDirection="row" 
      alignItems="center" 
      justifyContent="space-between"
      className={classes.section}
      >
        <Stack width="50%">
          <Typography variant="titleBold" mb={4}>
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
        <Box width="50%" align="right">
          <Box width="70%">
            <PolaroidImage tilt="right" hasTapes>
              <img src={smartphone} alt="" />    
            </PolaroidImage>
          </Box>
        </Box>
      </Container>
    </Stack>
  )
}

export default Home 