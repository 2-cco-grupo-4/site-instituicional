import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Rating,
  Avatar,
  Chip,
  useTheme,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Header from "molecules/Header";
import Footer from "molecules/Footer";
import {
  ImageStack,
  ImageContainer,
  ImageElement,
  Sidebar,
  UserArea,
  AvaliacaoBox,
} from "./Album.styles";
import imagemNoiva1 from "assets/img/noiva-feliz1.png";
import imagemNoiva2 from "assets/img/noiva-feliz2.png";
import imagemNoiva3 from "assets/img/noiva-feliz3.png";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "atoms/CustomButton/CustomButton";
import { ROUTES } from "utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "contexts";
import ModalLogin from "molecules/CustomLogin/CustomLogin";
import Contrato from "molecules/Contrato/Contrato";
import { ALBUM } from "service/album";
import { AVALIACAO } from "service/avaliacao";
import { set } from "react-hook-form";
import { IMAGEM } from "service/imagem";
import ProfilePic from "atoms/ProfilePic";

const images = [
  {
    id: 1,
    src: imagemNoiva1,
    title: "Imagem 1",
    tags: "Casamento, Vintage",
  },
  {
    id: 2,
    src: imagemNoiva2,
    title: "Imagem 2",
    tags: "Evento",
  },
  {
    id: 3,
    src: imagemNoiva3,
    title: "Imagem 3",
    tags: "Família",
  },
  // Adicione mais objetos de imagem aqui, se necessário
];

function Album() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { autenticado } = useUserContext();
  const [openContrato, setOpenContrato] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [tags, setTags] = useState([]);
  const { token } = useUserContext();
  const [album, setAlbum] = useState([]);
  const [fotografo, setFotografo] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [tema, setTemas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const { idAlbum } = useParams();
  const [imagensRenderizadas, setImagensRenderizadas] = useState([]);

  const [clientes, setClientes] = useState([]);
  const [sessoes, setSessoes] = useState([]);

  let chamadas = 0;

  let ready = false;

  useEffect(() => {
    let v = [];
    images.forEach((obj) => obj.tags.split(", ").forEach((tag) => v.push(tag)));

    setTags(v);
  }, []);

  const handleContract = () => {
    if (autenticado) {
      setOpenContrato(true);
    } else {
      setOpenLoginModal(true);
    }
  };

  const buscarAlbum = async () => {
    if (token != undefined) {
      console.log(`VALIDANDO TOKEN: ${token}`);
      try {
        const jsonAlbuns = await ALBUM.BUSCAR_ALBUM(idAlbum, token);
        setAlbum(jsonAlbuns.data);
        setFotografo(jsonAlbuns.data.fotografo);
        setImagens(jsonAlbuns.data.imagems);
        setTemas(jsonAlbuns.data.tema);

        console.log(`TESTE FOTOGRAFO ID: ${fotografo.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buscarSessoes = async () => {
    let listEventos = [];
    avaliacoes.forEach((avaliacao) => {
      listEventos.push(avaliacao.evento);
    });
    setSessoes(listEventos);
    console.log(`TESTE LISTA EVENTOS: ${JSON.stringify(sessoes)}`);
  };

  const buscarClientes = async () => {
    const listClientes = [];

    sessoes.forEach((sessao) => {
      listClientes.push(sessao.cliente);
    });

    setClientes(listClientes);

    console.log(`TESTE LISTA CLIENTES: ${JSON.stringify(clientes)}`);
  };

  const buscarAvaliacoes = async () => {
    const jsonAvaliacoes = await AVALIACAO.BUSCAR_AVALIACOES_FOTOGRAFO(
      fotografo.id,
      token
    );

    setAvaliacoes(jsonAvaliacoes.data);
  };

  useEffect(() => {
    if (token !== undefined) {
      buscarAlbum();
      chamadas++;
    }
  }, [token]);

  useEffect(() => {
    if (fotografo !== undefined) {
      buscarAvaliacoes();
    }
  }, [fotografo]);

  useEffect(() => {
    if (avaliacoes !== undefined) {
      buscarSessoes();
    }
  }, [avaliacoes]);

  useEffect(() => {
    if (sessoes !== undefined) {
      buscarClientes();
    }
  }, [sessoes]);

  useEffect(() => {
    const fetchImagens = async () => {
      const imagensRenderizadas = await Promise.all(
        imagens.map(async (imagem) => {
          console.log(`TESTE IMAGEM: ${JSON.stringify(imagem)}`);
          if (imagem.origemImagem === "s3") {
            try {
              const response = await IMAGEM.GET_OBJECT(imagem.id);
              const tipoImagem =
                response.headers["content-type"] || "image/png";

              const blob = new Blob([response.data], {
                type: tipoImagem,
              });

              const url = URL.createObjectURL(blob);

              // Retornar o elemento JSX diretamente
              return (
                <ImageContainer key={imagem.id} className="image">
                  <ImageElement
                    src={url}
                    alt={imagem.descricao}
                    style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                  />
                </ImageContainer>
              );
            } catch (error) {
              console.error("Erro na chamada API:", error);
              return null;
            }
          } else {
            // Se a origem não é S3, retornar o componente FeedAlbum padrão
            return (
              <ImageContainer key={imagem.id} className="image">
                <ImageElement
                  src={imagem.path}
                  alt={imagem.descricao}
                  style={{ width: "auto", height: "auto" }}
                />
              </ImageContainer>
            );
          }
        })
      );

      // Atualizar o componente renderizando os elementos JSX diretamente
      setImagensRenderizadas(imagensRenderizadas);
    };

    fetchImagens();
  }, [imagens, token]);

  return (
    <>
      <Header type={2} />
      <Stack direction="row" sx={{ width: "100%", justifyContent: "center" }}>
        <ImageStack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imagensRenderizadas}
        </ImageStack>
        <Sidebar spacing={5}>
          <UserArea spacing={3}>
            <Breadcrumbs separator=">" sx={{ cursor: "pointer" }}>
              <Link color="inherit" underline="hover" href={ROUTES.FEED}>
                Home
              </Link>
              <Link
                color="inherit"
                underline="hover"
                href={ROUTES.PERFIL(fotografo.id)}
              >
                {typeof fotografo == "object"
                  ? fotografo.nome
                  : console.log(typeof fotografo)}
              </Link>
              <Link color="inherit" underline="hover" href={ROUTES.ALBUM}>
                {album ? album.titulo : "Padrão"}
              </Link>
            </Breadcrumbs>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ProfilePic
                autor={fotografo.nome}
                sx={{
                  width: theme.spacing(8),
                  height: theme.spacing(8),
                  fontSize: 24,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(ROUTES.PERFIL(fotografo.id));
                }}
              />

              <Stack spacing={0.5}>
                <Typography variant="paragraph-medium-bold">
                  {typeof fotografo == "object"
                    ? fotografo.nome
                    : console.log(typeof fotografo)}
                </Typography>
                <Typography>São Paulo - SP</Typography>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={handleContract}
                >
                  Contratar
                </CustomButton>
              </Stack>
            </Stack>
          </UserArea>
          <Stack spacing={1}>
            <Typography variant="paragraph-large-bold">
              {album ? album.titulo : "Padrão"}
            </Typography>
            <Typography>{tema ? tema.nome : "Padrão"}</Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="paragraph-large-bold">Tags</Typography>
            <div>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "4px",
                    margin: "4px",
                  }}
                />
              ))}
            </div>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="paragraph-large-bold">Avaliação</Typography>
            {avaliacoes.length == 0 ? (
              <Typography
                variant="paragraph-small-regular"
                color="secondary.main"
                sx={{ textAlign: "left" }}
              >
                Não há avaliações para este fotógrafo.
              </Typography>
            ) : null}
            {avaliacoes.map((avaliacao, indice) => (
              <AvaliacaoBox>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <ProfilePic
                    autor={
                      typeof clientes === "object" &&
                      clientes[indice] &&
                      clientes[indice].nome !== undefined &&
                      clientes[indice].nome
                    }
                    sx={{
                      width: theme.spacing(8),
                      height: theme.spacing(8),
                      fontSize: 24,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginLeft: theme.spacing(2),
                    }}
                  >
                    <Rating
                      name="avaliação"
                      size="large"
                      sx={{ fontSize: theme.spacing(4) }}
                      readOnly
                      value={typeof avaliacao == "object" ? avaliacao.nota : 2}
                      // value={3.5}
                    />
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {typeof clientes === "object" &&
                      clientes[indice] &&
                      clientes[indice].nome !== undefined
                        ? clientes[indice].nome
                        : "Padrão"}
                    </Typography>
                    <Typography mt={2}>
                      {typeof avaliacao == "object" ? avaliacao.descricao : ""}
                    </Typography>
                  </div>
                </div>
              </AvaliacaoBox>
            ))}
          </Stack>
        </Sidebar>
      </Stack>
      <Footer />
      {autenticado ? (
        <Contrato
          open={openContrato}
          setOpen={setOpenContrato}
          fotografo={fotografo}
        />
      ) : (
        <ModalLogin open={openLoginModal} setOpen={setOpenLoginModal} />
      )}
    </>
  );
}

export default Album;
