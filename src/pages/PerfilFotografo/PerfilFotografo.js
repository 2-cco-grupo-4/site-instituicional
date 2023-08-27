import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import useStyles from "./PerfilFotografo.styles";
import Container from "atoms/Container";
import CustomButton from "atoms/CustomButton/CustomButton";
import Header from "molecules/Header";



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

const PerfilFotografo = () => {
  const classes = useStyles();

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Container className={classes.banner}></Container>
      <Typography fontSize={"16px"} margin={"12px"}>
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
        <Container className={classes.sectionOne}>
          <Typography fontWeight={"bold"}> Álbuns</Typography>
        </Container>
        <Container className={classes.sectionTwo}>
          <Typography fontWeight={"bold"}> Avaliações </Typography>
        </Container>
      </Box>
      <Container pb={2}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {imageList.map(({ index, alt, src }) => (
            <ImageListItem key={index}>
              <img src={src} alt={alt} />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Stack>
  );
};

export default PerfilFotografo;
