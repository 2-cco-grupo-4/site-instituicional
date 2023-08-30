import {
  Box,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import useStyles from "./PerfilFotografo.styles";
import Container from "atoms/Container";
import CustomButton from "atoms/CustomButton/CustomButton";
import Header from "molecules/Header";

import noivosSorriso from "assets/img/noivos-sorriso.png";
import noivaFlorestaBuque from "assets/img/noiva-floresta-buque.png";
import noivosPonte from "assets/img/noivos-ponte.png";
import cerimonia from "assets/img/cerimonia.png";
import noivosPorDoSol from "assets/img/noivos-por-do-sol.png";
import noivaPai from "assets/img/noiva-e-pai.png";
import noivaPraia from "assets/img/noivos-praia.png";
import noivaSolitaria from "assets/img/noiva-solitaria.png";
import { useState } from "react";
import CardAvaliacao from "molecules/CardAvaliacao/CardAvaliacao";

const imageList = [
  {
    alt: "noivos-sorriso",
    src: noivosSorriso,
  },
  {
    alt: "noiva-floresta-buque",
    src: noivaFlorestaBuque,
  },
  {
    alt: "noivosPonte",
    src: noivosPonte,
  },
  {
    alt: "cerimonia",
    src: cerimonia,
  },
  {
    alt: "noivosPorDoSol",
    src: noivosPorDoSol,
  },
  {
    alt: "noivaPai",
    src: noivaPai,
  },
  {
    alt: "noivaPraia",
    src: noivaPraia,
  },
  {
    alt: "noiva-solitaria",
    src: noivaSolitaria,
  },
];

const PerfilFotografo = () => {
  const [displayAlbum, setDisplayAlbum] = useState("");
  const [displayAvaliacao, setDisplayAvaliacao] = useState("none");

  const [colorTextAlbum, setColorTextAlbum] = useState("white");
  const [colorBackAlbum, setColorBackAlbum] = useState("black");
  const [colorTextAvaliacao, setColorTextAvaliacao] = useState("black");
  const [colorBackAvaliacao, setColorBackAvaliacao] = useState("white");

  const aoClicarAlbum = (evento) => {
    evento.preventDefault();
    setDisplayAlbum("");
    setDisplayAvaliacao("none");

    setColorTextAlbum("white");
    setColorBackAlbum("black");
    setColorTextAvaliacao("black");
    setColorBackAvaliacao("white");

    // console.log("ColorTextAlbum: " + colorTextAlbum);
  };

  const aoClicarAvaliacao = (evento) => {
    evento.preventDefault();
    setDisplayAlbum("none");
    setDisplayAvaliacao("");

    setColorTextAlbum("black");
    setColorBackAlbum("white");
    setColorTextAvaliacao("white");
    setColorBackAvaliacao("black");
  };

  const classes = useStyles();

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Container className={classes.banner}></Container>
      <Typography paddingLeft={"64px"} fontSize={"16px"} margin={"12px"}>
        {"Home > Renata Fereira"}
      </Typography>
      <Stack className={classes.cabecalho}></Stack>
      <Stack className={classes.textoCabecalho}>
        <Typography fontWeight={"bold"} fontSize={"24px"}>
          Renata Fereira
        </Typography>
        <Typography color={"grey"} fontWeight={"bold"}>
          @referphots
        </Typography>
        <Typography width={"35%"} marginBottom={"15px"} paddingTop={"10px"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </Typography>
        <CustomButton variant={"contained"}> Editar Perfil</CustomButton>
      </Stack>
      <Box className={classes.section}>
        <Container
          className={classes.sectionOne}
          sx={{
            backgroundColor: colorBackAlbum,
          }}
        >
          <Typography fontWeight={"bold"}>
            <a
              style={{ color: colorTextAlbum, textDecoration: "none" }}
              href="/perfil-fotografo"
              alt="Página do perfil do fotografo"
              onClick={aoClicarAlbum}
            >
              Álbuns
            </a>
          </Typography>
        </Container>
        <Container
          className={classes.sectionTwo}
          sx={{ backgroundColor: colorBackAvaliacao }}
        >
          <Typography fontWeight={"bold"}>
            <a
              style={{ color: colorTextAvaliacao, textDecoration: "none" }}
              href="/perfil-fotografo"
              alt="Página do perfil do fotografo"
              onClick={aoClicarAvaliacao}
            >
              Avaliação
            </a>
          </Typography>
        </Container>
      </Box>

      {/* Parte album */}

      <Container sx={{ display: displayAlbum }} pb={2}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {imageList.map(({ index, alt, src }) => (
            <ImageListItem key={index}>
              <img src={src} alt={alt} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      {/* Parte Avaliação */}

      <Box sx={{display: displayAvaliacao}} className={classes.avaliacoes}>
        <CardAvaliacao name={"Davi"}/>
        <CardAvaliacao name={"Davi"}/>
      </Box>
    </Stack>
  );
};

export default PerfilFotografo;
