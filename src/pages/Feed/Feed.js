import useStyles from "./Feed.styles"
import Header from 'molecules/Header'
import { Alert, Collapse, IconButton, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material"
import Container from "atoms/Container"
import FeedAlbum from "molecules/FeedAlbum/FeedAlbum"
import { Masonry } from "@mui/lab"
import { useState, useEffect } from "react"
import { useUserContext } from "contexts"
import { IMAGEM } from "service/imagem";

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

const loadingDuration = 2000;

const Feed = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [category, setCategory] = useState();
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const { token } = useUserContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numImagesToShow, setNumImagesToShow] = useState(20);

  useEffect(() => {
    loadImages();
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
        console.error('Erro na chamada API:', error);
        setLoading(false);
      });
  };

  const handleTabChange = (_, newCategory) => {
    console.log(newCategory)
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
    console.log("Clicou na imagem com idAlbum:", idAlbum);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              {images.map((image, index) => (
                <FeedAlbum
                  key={index}
                  src={image.path}
                  autor={image.fotografo}
                  idAlbum={image.albumId}
                  onImageClick={handleImageClick}
                />
              ))}
            </Masonry>
          </Stack>
        </Container>
      </Stack>
      {loading && (
        <Typography
          variant="h6"
          style={{
            filter: "blur(3px)",
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
