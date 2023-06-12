import useStyles from "./Feed.styles"
import Header from 'molecules/Header'
import { ImageList, ImageListItem, Stack } from "@mui/material"

import baloes from "assets/img/baloes.jpg"
import bolo from "assets/img/bolo.jpg"
import brinde from "assets/img/brinde.jpg"
import buque from "assets/img/buque.jpg"
import casal from "assets/img/casal.jpg"
import criancaCasamento from "assets/img/crianca-casamento.jpg"
import senhorAniversario from "assets/img/senhor-aniversario.jpg"
import sobrinho from "assets/img/sobrinho.jpg"
import tacas from "assets/img/tacas.jpg"
import Footer from "molecules/Footer"
import Container from "atoms/Container"

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

const Feed = () => {
  const classes = useStyles()

  return (
    <>
      <Header type={2} />
      <Stack>
        <Container>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imageList.map(({ index, alt, src }) => (
              <ImageListItem key={index}>
                <img src={src} alt={alt} />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Stack>
    </>
  )
}

export default Feed