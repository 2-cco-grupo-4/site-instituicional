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
import { useNavigate } from "react-router-dom";
import { useUserContext } from "contexts";
import ModalLogin from "molecules/CustomLogin/CustomLogin";
import Contrato from "molecules/Contrato/Contrato";

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

  useEffect(() => {
    let v = [];
    images.forEach((obj) => obj.tags.split(", ").forEach((tag) => v.push(tag)));

    setTags(v);
  }, [tags]);

  const handleContract = () => {
    if (autenticado) {
      setOpenContrato(true);
    } else {
      setOpenLoginModal(true);
    }
  };

  return (
    <>
      <Header type={2} />
      <Stack direction="row" sx={{ width: "100%" }}>
        <ImageStack>
          {images.map((image) => (
            <ImageContainer key={image.id} className="image">
              <ImageElement
                src={image.src}
                alt={image.title}
                style={{ width: "100%" }}
              />
            </ImageContainer>
          ))}
        </ImageStack>
        <Sidebar spacing={5}>
          <UserArea spacing={3}>
            <Breadcrumbs separator=">" sx={{ cursor: "pointer" }}>
              <Link color="inherit" underline="hover" href={ROUTES.FEED}>
                Home
              </Link>
              <Link color="inherit" underline="hover" href={ROUTES.PERFIL}>
                Renata Ferreira
              </Link>
              <Link color="inherit" underline="hover" href={ROUTES.ALBUM}>
                Casamento Ana e Bruno
              </Link>
            </Breadcrumbs>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                style={{ width: theme.spacing(8), height: theme.spacing(8) }}
                onClick={() => navigate("/perfil-fotografo")}
              >
                <PersonIcon style={{ fontSize: 24 }} />
              </Avatar>

              <Stack spacing={0.5}>
                <Typography variant="paragraph-medium-bold">
                  Renata Ferreira
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
            <Typography variant="paragraph-large-bold">Título</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget sem vel justo hendrerit laoreet. Morbi sed arcu nec libero
              tristique placerat. Sed efficitur tristique mi, eu congue lorem
              auctor eget.
            </Typography>
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
            <AvaliacaoBox>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flex: 1,
                  height: "100%",
                  width: "100%",
                }}
              >
                <Avatar
                  style={{ width: theme.spacing(8), height: theme.spacing(8) }}
                >
                  <PersonIcon style={{ fontSize: 24 }} />
                </Avatar>
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
                    value={5}
                  />
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight: "bold",
                      marginTop: "5px",
                    }}
                  >
                    Nome usuário avaliador
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                  height: "100%",
                }}
              >
                <Typography style={{ marginTop: "16px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  eget sem vel justo hendrerit laoreet. Morbi sed arcu nec
                  libero tristique placerat. Sed efficitur tristique mi, eu
                  congue lorem auctor eget.
                </Typography>
              </div>
            </AvaliacaoBox>
          </Stack>
        </Sidebar>
      </Stack>
      <Footer />
      {autenticado ? (
        <Contrato open={openContrato} setOpen={setOpenContrato} />
      ) : (
        <ModalLogin open={openLoginModal} setOpen={setOpenLoginModal} />
      )}
    </>
  );
}

export default Album;
