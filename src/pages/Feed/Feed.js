import useStyles from "./Feed.styles";
import Header from "molecules/Header";
import {
  Alert,
  Collapse,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import Container from "atoms/Container";
import FeedAlbum from "molecules/FeedAlbum/FeedAlbum";
import { Masonry } from "@mui/lab";
import { useState, useEffect } from "react";
import { useUserContext } from "contexts";
import { IMAGEM } from "service/imagem";
import { ROUTES } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { TEMA } from "service/tema";

const CATEGORIES = [
  "Casamento",
  "Vintage",
  "Evento",
  "Família",
  "Aniversário",
  "Festa",
  "Pets",
  "Debutante",
  "Formatura",
  "Esporte",
  "Paisagem",
];

const loadingDuration = 2000;

const Feed = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const { token } = useUserContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numImagesToShow, setNumImagesToShow] = useState(20);
  const [temas, setTemas] = useState([]);
  const [temaBusca, setTemaBusca] = useState("");
  const [tabActive, setTabActive] = useState(null);

  useEffect(() => {
    if (token) {
      loadImages();
      loadThemes();
    }
  }, [token]);

  const loadImages = () => {
    if (loading) return;
    setLoading(true);
    IMAGEM.VISUALIZAR(token)
      .then((response) => {
        const shuffledImages = response.data.sort(() => 0.5 - Math.random());
        setImages([...images, ...shuffledImages.slice(0, numImagesToShow)]);
        setNumImagesToShow(numImagesToShow + 20);
        setTimeout(() => {
          setLoading(false);
        }, loadingDuration);
      })
      .catch((error) => {
        console.error("Erro na chamada API:", error);
        setLoading(false);
      });
  };

  const loadThemes = () => {
    TEMA.LISTAR_TEMAS(token).then((response) => {
      setTemas(response.data);
      console.log(`TESTANDO LISTA DE TEMAS: ${JSON.stringify(response.data)}`);
    });
  };

  const handleTabChange = (_, newCategory) => {
    console.log(newCategory);
    // Se o novo Tab for o mesmo que o Tab ativo, desceleciona
    const newTabActive = tabActive === newCategory ? null : newCategory;
    setTabActive(newTabActive);
    setCategory(newTabActive);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (temaBusca != "") return;
      loadImages();
    }
  };

  const handleImageClick = (idAlbum) => {
    navigate(ROUTES.ALBUM(idAlbum));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchTheme = (nomeTema) => {
    if (loading) return;
    setLoading(true);
    IMAGEM.VISUALIZAR_TEMA(token, nomeTema)
      .then((response) => {
        console.log(
          `TESTANDO RESPOSTA DA API: ${JSON.stringify(response.data)}`
        );
        const shuffledImages = response.data.sort(() => 0.5 - Math.random());
        setImages(shuffledImages.slice(0, numImagesToShow));
        setNumImagesToShow(numImagesToShow + 20);
        setTimeout(() => {
          setLoading(false);
        }, loadingDuration);
      })
      .catch((error) => {
        console.error("Erro na chamada API:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(`TESTANDO TEMA BUSCA: ${JSON.stringify(temaBusca)}`);
    if (temaBusca != "") {
      searchTheme(temaBusca);
    }
    if (temaBusca === "") {
      loadImages();
    }
  }, [temaBusca]);

  const getImagemS3 = (idObject) => {
    IMAGEM.GET_OBJECT(idObject)
      .then((response) => {
        console.log(`TESTE RETORNO S3: ${response.data}`);
        return response.data;
      })
      .catch((error) => {
        console.error("Erro na chamada API:", error);
      });
  };

  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const fetchImagens = async () => {
      const imagensAtualizadas = await Promise.all(
        images.map(async (image, index) => {
          if (image.origemImagem === "s3") {
            try {
              const response = await IMAGEM.GET_OBJECT(image.imagemId);
              const tipoImagem =
                response.headers["content-type"] || "image/png";

              const blob = new Blob([response.data], {
                type: tipoImagem,
              });

              const url = URL.createObjectURL(blob);

              // Renderizar o componente FeedAlbum com a URL da imagem
              return (
                <FeedAlbum
                  key={index}
                  src={url}
                  autor={image.fotografo}
                  onClick={() => handleImageClick(image.albumId)}
                />
              );
            } catch (error) {
              console.error("Erro ao buscar imagem:", error);
              return null; // Ou qualquer coisa que indique que houve um erro
            }
          } else {
            // Se a origem não é S3, retornar o componente FeedAlbum padrão
            return (
              <FeedAlbum
                key={index}
                src={image.path}
                autor={image.fotografo}
                onClick={() => handleImageClick(image.albumId)}
              />
            );
          }
        })
      );

      setImagens(imagensAtualizadas.filter(Boolean));
    };

    fetchImagens();
  }, [images]);

  return (
    <>
      <Header type={2} />
      <Tabs
        className={classes.tabs}
        value={tabActive}
        variant="scrollable"
        scrollButtons
        aria-label="scrollable categories"
        onChange={handleTabChange}
      >
        {temas.length > 0
          ? temas.map((content) => (
              <Tab
                key={content.id_tema}
                label={content.nome}
                onClick={() =>
                  temaBusca === content.nome
                    ? setTemaBusca("")
                    : setTemaBusca(content.nome)
                }
              />
            ))
          : console.log(`TEMAS ENCONTRADOS: ${JSON.stringify(temas)}`)}
      </Tabs>
      <Collapse in={isInfoOpen}>
        <Alert
          icon={false}
          onClose={() => setIsInfoOpen(false)}
          variant="filled"
          style={{
            borderRadius: 0,
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 8),
          }}
        >
          <Typography variant="paragraph-xsmall-regular">
            Escolhemos essas imagens com base nas suas preferências, caso deseje
            ver mais opções você pode fazer uma busca ou navegar pelas tags!
          </Typography>
        </Alert>
      </Collapse>
      <Stack py={4}>
        <Container display="flex" flexDirection="column" alignItems="center">
          <Stack alignItems="center" sx={{ width: "calc(100% + 24px)" }}>
            <Masonry columns={3} spacing={3} sx={{ width: "100%" }}>
              {imagens.map((imagem) => imagem)}
            </Masonry>
          </Stack>
        </Container>
      </Stack>
      {loading && (
        <Typography
          variant="h6"
          style={{
            transition: `filter ${loadingDuration}ms`,
          }}
        >
          Carregando...
        </Typography>
      )}
    </>
  );
};

export default Feed;
