import useStyles from "./Feed.styles"
import Header from 'molecules/Header'
import { Alert, Collapse, IconButton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material"

import baloes from "assets/img/baloes.jpg"
import bolo from "assets/img/bolo.jpg"
import brinde from "assets/img/brinde.jpg"
import buque from "assets/img/buque.jpg"
import casal from "assets/img/casal.jpg"
import criancaCasamento from "assets/img/crianca-casamento.jpg"
import noivaFeliz from "assets/img/noiva-feliz1.png"
import senhorAniversario from "assets/img/senhor-aniversario.jpg"
import sobrinho from "assets/img/sobrinho.jpg"
import tacas from "assets/img/tacas.jpg"
// import Footer from "molecules/Footer"
import Container from "atoms/Container"
import FeedAlbum from "molecules/FeedAlbum/FeedAlbum"
import { Masonry } from "@mui/lab"
import { useState } from "react"

const IMAGE_LIST = [
  {
    alt: "noiva-bw",
    src: noivaFeliz,
  },
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

const CATEGORIES = [
  'Casamento',
  'Vintage',
  'Evento', 'Família',
  'Aniversário',
  'Festa',
  'Pets',
  'Debutante',
  'Formatura',
  'Esporte',
  'Paisagem'
]

const Feed = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [category, setCategory] = useState()
  const [isInfoOpen, setIsInfoOpen] = useState(true)

  const handleTabChange = (_, newCategory) => {
    console.log(newCategory)
    setCategory(newCategory)
  }

  return (
    <>
      <Header type={2} />
      <Tabs
        className={classes.tabs}
        value={category}
        variant="scrollable"
        scrollButtons
        aria-label="scrollable categories"
        onChange={handleTabChange}
      >
        {CATEGORIES.map((content) => (
          <Tab key={content} label={content} />
        ))}
      </Tabs >
      <Collapse in={isInfoOpen}>
        <Alert
          icon={false}
          onClose={() => setIsInfoOpen(false)}
          variant="filled"
          style={{
            borderRadius: 0,
            backgroundColor: theme.palette.secondary.main,
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 8),
          }}
        >
          <Typography variant="paragraph-xsmall-regular">
            Escolhemos essas imagens com base nas suas preferências, caso deseje ver mais opções{' '}
            você pode fazer uma busca ou navegar pelas tags!
          </Typography>
        </Alert>
      </Collapse>
      <Stack py={4}>
        <Container display="flex" flexDirection="column" alignItems="center">
          <Stack alignItems="center" sx={{ width: "calc(100% + 24px)" }}>
            <Masonry columns={3} spacing={3} sx={{ width: '100%' }}>
              {IMAGE_LIST.map(({ index, alt, src }) => (
                <FeedAlbum key={index} src={src} alt={alt} autor="Renata" />
              ))}
            </Masonry >
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export default Feed