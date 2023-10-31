import {
  Box,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  Rating,
  Stack,
  Tab,
  Tabs,
  Typography,
  Link,
  useTheme,
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
import { ROUTES } from "utils/constants";
import Footer from "molecules/Footer/Footer";
import { useNavigate } from "react-router-dom";

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

const avaliacaoList = [
  {
    name: "Davi",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Davi",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Davi",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    name: "Davi",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
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

  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Container className={classes.banner}>
        <Stack className={classes.fotoPerfil}></Stack>
      </Container>
      <Stack className={classes.textoCabecalho}>
        <Typography fontWeight={"bold"} fontSize={"24px"}>
          Renata Fereira
        </Typography>
        <Typography color={"grey"} fontWeight={"bold"}>
          @referphots
        </Typography>
        <Typography width={"35%"} marginBottom={"15px"} paddingTop={"10px"}>
          Pessoas fazem fotos de qualquer coisa bonita. Fotógrafos fazem fotos
          bonitas de qualquer coisa.
        </Typography>
        <CustomButton variant={"contained"}>Contratar</CustomButton>
      </Stack>
      <Container className={classes.section}>
        <Container
          className={classes.sectionOne}
          sx={{
            backgroundColor: colorBackAlbum,
            cursor: "pointer",
          }}
          onClick={aoClicarAlbum}
        >
          <Typography fontWeight={"bold"}>
            <a
              style={{ color: colorTextAlbum, textDecoration: "none" }}
              href="/perfil-fotografo"
              alt="Página do perfil do fotografo"
            >
              Álbuns
            </a>
          </Typography>
        </Container>
        <Container
          className={classes.sectionTwo}
          sx={{ backgroundColor: colorBackAvaliacao, cursor: "pointer" }}
          onClick={aoClicarAvaliacao}
        >
          <Typography fontWeight={"bold"}>
            <a
              style={{ color: colorTextAvaliacao, textDecoration: "none" }}
              href="/perfil-fotografo"
              alt="Página do perfil do fotografo"
            >
              Avaliação
            </a>
          </Typography>
        </Container>
      </Container>

      {/* Parte album */}

      <Container sx={{ display: displayAlbum }} pb={2}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {imageList.map(({ index, alt, src }) => (
            <ImageListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.ALBUM)}
            >
              <img src={src} alt={alt} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      {/* Parte Avaliação */}

      <Container
        sx={{ display: displayAvaliacao }}
        className={classes.avaliacoes}
      >
        {avaliacaoList.map(({ name, text }) => (
          <CardAvaliacao name={name} text={text} />
        ))}
      </Container>
      <Footer />
    </Stack>
  );
};

export default PerfilFotografo;
