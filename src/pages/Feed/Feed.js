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

  useEffect(() => {
    if (token) loadImages();
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

  const handleTabChange = (_, newCategory) => {
    console.log(newCategory);
    setCategory(newCategory);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
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
        value={category}
        variant="scrollable"
        scrollButtons
        aria-label="scrollable categories"
        onChange={handleTabChange}
      >
        {CATEGORIES.map((content) => (
          <Tab key={content} label={content} />
        ))}
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
