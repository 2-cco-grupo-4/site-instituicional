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
import { useState, useEffect } from "react";
import CardAvaliacao from "molecules/CardAvaliacao/CardAvaliacao";
import { ROUTES } from "utils/constants";
import Footer from "molecules/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "contexts";
import { ALBUM } from "service/album";
import api from "service/api";
import { IMAGEM } from "service/imagem";

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

  const [albums, setAlbums] = useState([]);

  const [capaAlbum, setCapaAlbum] = useState([]);

  const [avaliacoes, setAvaliacoes] = useState([]);

  const { token, nome, tokenSolicitacao } = useUserContext();

  const { idFotografo } = useParams();

  const [listCapas, setListCapas] = useState([]);

  useEffect(() => {
    const ChamadaApi = async () => {
      ALBUM.BUSCAR_CAPAS_ALBUM(idFotografo, token).then((response) => {
        console.log(`RESPOSTA LISTAR ALBUNS: ${JSON.stringify(response.data)}`);
        setAlbums(response.data);
      });
    };
    ChamadaApi();
  }, [idFotografo, token]);

  useEffect(() => {
    const ChamadaApi = async () => {
      ALBUM.LISTAR_AVALIACOES(idFotografo, token).then((response) => {
        console.log(
          `RESPOSTA LISTAR AVALIACOES: ${JSON.stringify(response.data)}`
        );
        setAvaliacoes(response.data);
      });
    };
    ChamadaApi();
  }, [idFotografo, token]);

  useEffect(() => {
    let capa = albums.map((album, index) => ({
      alt: album.idAlbum,
      src: album.pathCapa,
    }));
    setCapaAlbum(capa);
  }, [albums]);

  useEffect(() => {
    const ChamadaApi = async () => {
      const capasAlbum = await Promise.all(
        capaAlbum.map(async (album) => {
          if (album.origemImagem === "s3") {
            try {
              const response = await IMAGEM.GET_OBJECT(album.idImagem);
              const tipoImagem =
                response.headers["content-type"] || "image/jpeg";
              const blob = new Blob([response.data], { type: tipoImagem });
              const src = URL.createObjectURL(blob);

              return (
                <ImageListItem
                  key={album.alt}
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(ROUTES.ALBUM(album.alt))}
                >
                  <img src={src} alt={album.alt} />
                </ImageListItem>
              );
            } catch (error) {
              console.error(error);
              return null; // Retorna null para ser filtrado posteriormente
            }
          } else {
            return (
              <ImageListItem
                key={album.alt}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(ROUTES.ALBUM(album.alt))}
              >
                <img src={album.src} alt={album.alt} />
              </ImageListItem>
            );
          }
        })
      );

      // Filtra elementos nulos (resultados de catch)
      setListCapas(capasAlbum.filter(Boolean));
    };

    ChamadaApi();
  }, [capaAlbum]);

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Container className={classes.banner}></Container>
      <Breadcrumbs
        separator=">"
        sx={{
          cursor: "pointer",
          marginLeft: theme.spacing(8),
          marginTop: theme.spacing(3),
        }}
      >
        <Link
          color={theme.palette.secondary.main}
          underline="hover"
          href={ROUTES.FEED}
        >
          Home
        </Link>
        <Link
          color={theme.palette.secondary.main}
          underline="hover"
          href={ROUTES.PERFIL}
        >
          Renata Ferreira
        </Link>
        <Link
          color={theme.palette.secondary.main}
          underline="hover"
          href={ROUTES.ALBUM}
        >
          Casamento Ana e Bruno
        </Link>
      </Breadcrumbs>
      <Stack className={classes.textoCabecalho}>
        <Stack className={classes.cabecalho}></Stack>
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

      <Container sx={{ display: displayAlbum }} pb={2}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {listCapas.map((item) => item)}
        </ImageList>
      </Container>

      {/* Parte Avaliação */}

      <Container
        sx={{ display: displayAvaliacao }}
        className={classes.avaliacoes}
      >
        {avaliacoes.map((avaliacao, index) => (
          <CardAvaliacao
            key={index}
            name={avaliacao.name}
            text={avaliacao.text}
          />
        ))}
      </Container>
      <Footer />
    </Stack>
  );
};

export default PerfilFotografo;
