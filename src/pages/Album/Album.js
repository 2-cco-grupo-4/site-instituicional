import React, { useEffect, useState } from "react";
import { Stack, Typography, Rating, Avatar, Chip, useTheme } from "@mui/material";
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
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "atoms/CustomButton/CustomButton";

const images = [
  {
    id: 1,
    src: "https://cdn0.casamentos.com.br/article-vendor/8379/3_2/960/jpg/mari-leo-previas-49_13_178379-166013221645741.jpeg",
    title: "Imagem 1",
    tags: "Natureza, Paisagem",

  },
  {
    id: 2,
    src: "https://img.freepik.com/premium-photo/wedding-photo-young-married-couple-having-fun-dancing-by-large-lake-selective-focus-high-quality-photo_597987-5743.jpg?w=2000",
    title: "Imagem 2",
    tags: "Arquitetura, Urbano",
  },
  // Adicione mais objetos de imagem aqui, se necessário
];

function Album() {
  const theme = useTheme()
  const [tags, setTags] = useState([])

  useEffect(() => {
    let v = []
    images.forEach((obj) => obj.tags.split(', ').forEach((tag) => v.push(tag)))

    setTags(v)
  }, [tags])

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
          <UserArea>
            <Stack direction="row" alignItems="center" spacing={2}>

              <Avatar style={{ width: theme.spacing(8), height: theme.spacing(8) }}>
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
                >
                  Contratar
                </CustomButton>
              </Stack>
            </Stack>
          </UserArea>
          <Stack spacing={1}>
            <Typography
              variant="paragraph-large-bold"
            >
              Título
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget sem vel justo hendrerit laoreet. Morbi sed arcu nec libero
              tristique placerat. Sed efficitur tristique mi, eu congue lorem
              auctor eget.
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography
              variant="paragraph-large-bold"
            >
              Tags
            </Typography>
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
            <Typography
              variant="paragraph-large-bold"
            >
              Avaliação
            </Typography>
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
                <Avatar style={{ width: theme.spacing(8), height: theme.spacing(8) }}>
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
                    sx={{fontSize: theme.spacing(3)}}
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
                  eget sem vel justo hendrerit laoreet. Morbi sed arcu nec libero
                  tristique placerat. Sed efficitur tristique mi, eu congue lorem
                  auctor eget.
                </Typography>
              </div>
            </AvaliacaoBox>
          </Stack>
        </Sidebar >
      </Stack >
      <Footer></Footer>
    </>
  );
}

export default Album;
