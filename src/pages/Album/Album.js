import React from "react";
import { Stack, Typography, Button, Avatar, Chip } from "@mui/material";
import Header from "molecules/Header";
import Footer from "molecules/Footer";
import {
  ImageStack,
  ImageContainer,
  ImageElement,
  Sidebar,
  UserNameTypography,
  UserArea,
  AvaliacaoBox,
  StarIcon,
} from "./Album.styles";
import PersonIcon from "@mui/icons-material/Person";

function Album(props) {
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

  console.log("Rendering Album component");

  return (
    <>
      <Header type={3} />
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
        <Sidebar>
          <UserArea>
            <div style={{ display: "flex", width: "75%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",

                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Avatar style={{ width: "86px", height: "86px" }}>
                  <PersonIcon style={{ fontSize: "32px" }} />
                </Avatar>
              </div>
              <div
                style={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                  padding:"12px"
                }}
              >
                <UserNameTypography variant="h6">
                  Nome do Usuário
                </UserNameTypography>
                <Typography>Localização do Usuário</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: "30px", fontWeight: "bold" }}
                >
                  Contratar
                </Button>
              </div>
            </div>
          </UserArea>
          <div style={{padding:"12px"}}>
            <Typography
              variant="h2"
              style={{ marginTop: "16px", fontWeight: "700" }}
            >
              Título
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget sem vel justo hendrerit laoreet. Morbi sed arcu nec libero
              tristique placerat. Sed efficitur tristique mi, eu congue lorem
              auctor eget.
            </Typography>
            <Typography
              variant="h2"
              style={{ marginTop: "16px", fontWeight: "700" }}
            >
              Tags
            </Typography>
            <div>
              {images[0].tags.split(", ").map((tag, index) => (
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
        
          <Typography
            variant="h2"
            style={{ marginTop: "8%", fontWeight: "700" }}
          >
            Avaliação
          </Typography>
          
          </div>
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
              <Avatar style={{ width: "64px", height: "64px" }}>
                <PersonIcon style={{ fontSize: "32px" }} />
              </Avatar>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StarIcon>★</StarIcon>
                  <StarIcon>★</StarIcon>
                  <StarIcon>★</StarIcon>
                  <StarIcon>★</StarIcon>
                  <StarIcon>★</StarIcon>
                </div>
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
        </Sidebar>
      </Stack>
      <Footer></Footer>
    </>
  );
}

export default Album;
