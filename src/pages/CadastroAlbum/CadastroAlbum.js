import useStyles from "./CadastroAlbum.styles";
import Header from "molecules/Header";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Checkbox,
  TextField,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import Container from "atoms/Container";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FOTOGRAFO } from "service/user";
import CustomButton from "atoms/CustomButton";
import { ROUTES } from "utils/constants";
import { INSTAGRAM } from "service/instagram";
import goBackArrow from "assets/icons/go-back-arrow-black.svg";
import { TEMA } from "service/tema";
import { ALBUM } from "service/album";
import { IMAGEM } from "service/imagem";
import { useUserContext } from "contexts";
import { Masonry } from "@mui/lab";
import iconCheck from "assets/icons/round-check.svg";
import FeedAlbum from "molecules/FeedAlbum";
import DashedCard from "atoms/DashedCard";
import SlcInsta from "../../assets/img/slc-insta.jpg";
import SlcDisp from "../../assets/img/slc-disp.jpg";

const CadastroAlbum = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { token, id, nome, tokenSolicitacao } = useUserContext();

  const [listImagensInsta, setListImagensInsta] = useState([{}]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { handleSubmit, control, setValue, reset } = useForm();
  const [listImagensSelecionadas, setListImagensSelecionadas] = useState([]);
  const [listTemas, setListTemas] = useState([]);
  const [idFotografo, setIdFotografo] = useState(null);
  const [origemVisible, setOrigemVisible] = useState(true);
  const [imagensVisible, setImagensVisible] = useState(false);
  const [origem, setOrigem] = useState(null);

  useEffect(() => {
    setIdFotografo(id);
    console.log("ALERTA: " + id);
  }, [id]);

  const handleOrigem = (origem) => {
    setOrigem(origem);

    if (origem === "INSTA") {
      listarImagensInsta();
    } else if (origem === "S3") {
      setOrigemVisible(false);
      setImagensVisible(true);
    }
  };

  const listarImagensInsta = () => {
    const ChamadaApi = async () => {
      INSTAGRAM.LISTAR_IMAGENS_INSTA(token, tokenSolicitacao).then(
        (response) => {
          console.log(`RESPOSTA INSTA: ${JSON.stringify(response.data)}`);
          setListImagensInsta(response.data);
        }
      );
    };
    setOrigemVisible(false);
    setImagensVisible(true);
    ChamadaApi();
  };

  const handleClick = (imagem) => {
    if (
      listImagensSelecionadas.find(
        (selectedImage) => selectedImage.id === imagem.id
      )
    ) {
      setListImagensSelecionadas(
        listImagensSelecionadas.filter(
          (selectedImage) => selectedImage.id !== imagem.id
        )
      );
    } else {
      setListImagensSelecionadas([...listImagensSelecionadas, imagem]);
    }
  };

  const onSubmitHandler = async (data) => {
    setBtnLoading(true);

    const payload = {
      titulo: data.titulo,
      descricao: data.descricao,
      idTema: data.idTema,
      idFotografo: idFotografo,
    };

    await ALBUM.CADASTRAR(payload, token).then((response) => {
      if (origem === "INSTA") {
        listImagensSelecionadas.map((imagem) => {
          const payload = {
            mediaUrl: imagem.media_url,
            permalink: imagem.permalink,
            mediaType: imagem.media_type,
            origemImagem: "INSTA",
            updatedAt: new Date(Date.now()),
            idAlbum: response.data.id,
          };
          IMAGEM.SALVAR(token, payload).then((response) => {
            console.log(response);
            setBtnLoading(false);
            reset({ titulo: "", descricao: "", idTema: "" });
            setListImagensSelecionadas([]);
          });
        });
      } else if (origem === "S3") {
        const formData = new FormData();

        selectedFile.map((file) => {
          formData.append("file", file);
        });

        IMAGEM.SALVAR_S3(token, formData, response.data.id).then((response) => {
          console.log(response);
          setBtnLoading(false);
          reset({ titulo: "", descricao: "", idTema: "" });
          setListImagensSelecionadas([]);
        });
      }
      console.log(response.data.id);
    });
  };

  const listarTemas = (nome) => {
    TEMA.PESQUISAR_TEMA(nome).then((response) => {
      if (response.status === 200) {
        setListTemas(response.data);
      } else if (response.status === 204) {
        setListTemas([]);
      }
    });
  };

  useEffect(() => {
    console.log(listImagensSelecionadas);
  }, [listImagensSelecionadas]);

  console.log("teste");

  const [selectedFile, setSelectedFile] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFile((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <Stack>
      <Header type={2} />

      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        margin={0}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} margin={0}>
          <Container py={4}>
            <img
              src={goBackArrow}
              alt="go-back-arrow"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.FEED)}
            />
          </Container>
          <Container sx={{ marginBottom: "50px" }}>
            <Typography fontWeight="bold" fontSize={24}>
              Cadastrar um novo álbum
            </Typography>
          </Container>
          <Container
            component="form"
            display="flex"
            flexDirection="row"
            id="album-form"
            justifyContent="space-between"
            padding={0}
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ paddingLeft: 0 }}
          >
            <Grid container sx={{ display: "flex", flexDirection: "columns" }}>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                margin={0}
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                mb={2}
              >
                <Stack width="48%">
                  <Controller
                    name="titulo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="titulo-ipt"
                        label="Título"
                        width="100%"
                      />
                    )}
                  />
                </Stack>
                <Stack width="48%">
                  <Controller
                    name="idTema"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        options={
                          listTemas.length > 0
                            ? listTemas.map((tema) => tema.nome)
                            : []
                        }
                        getOptionLabel={(option) => option}
                        onChange={(event, newValue) => {
                          const selectedTema = listTemas.find(
                            (tema) => tema.nome === newValue
                          );
                          if (selectedTema) {
                            field.onChange(selectedTema.id);
                          } else {
                            field.onChange(null);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...field}
                            id="tema-ipt"
                            label="Tema"
                            width="100%"
                            onKeyDown={(e) => listarTemas(e.target.value)}
                          />
                        )}
                      />
                    )}
                  ></Controller>
                </Stack>
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                margin={0}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Stack width="100%">
                  <Controller
                    name="descricao"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="descricao-ipt"
                        label="Descrição"
                        width="100%"
                      />
                    )}
                  ></Controller>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} margin={0}>
          <Container>
            <Stack
              direction="column"
              alignItems="center"
              spacing={3}
              width="100%"
              {...(origemVisible ? { display: "flex" } : { display: "none" })}
            >
              <Typography fontWeight="bold">
                Qual a origem das imagens desse álbum?
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
                <DashedCard
                  width={{ xs: 230, sm: 350 }}
                  alignItems="center"
                  spacing={4}
                >
                  <img src={SlcInsta} className={classes.image}></img>
                  <Typography
                    variant="paragraph-medium-regular"
                    align="center"
                    width={{ xs: 200, sm: 280 }}
                  >
                    Desejo usar imagens do meu perfil do instagram
                  </Typography>
                  <CustomButton
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleOrigem("INSTA")}
                  >
                    <Typography variant="paragraph-small-regular" color="white">
                      Usar imagens do instagram
                    </Typography>
                  </CustomButton>
                </DashedCard>
                <DashedCard
                  width={{ xs: 230, sm: 350 }}
                  alignItems="center"
                  spacing={4}
                >
                  <img src={SlcDisp} className={classes.image}></img>
                  <Typography
                    variant="paragraph-medium-regular"
                    align="center"
                    width={{ xs: 200, sm: 280 }}
                  >
                    Desejo fazer upload de imagens do meu dispositivo
                  </Typography>
                  <CustomButton
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleOrigem("S3")}
                  >
                    <Typography variant="paragraph-small-regular" color="white">
                      Usar imagens locais
                    </Typography>
                  </CustomButton>
                </DashedCard>
              </Stack>
            </Stack>
          </Container>
        </Grid>

        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          {...(imagensVisible ? { display: "flex" } : { display: "none" })}
        >
          {origem === "INSTA" ? ( // INSTA
            <Container>
              <Grid container spacing={2}>
                <Container>
                  <Masonry columns={2} spacing={5} sx={{ width: "100%" }}>
                    {listImagensInsta.map((imagem) => (
                      <Grid key={imagem.id} item md={4}>
                        <Stack
                          id={imagem.id}
                          className={classes.content}
                          onClick={() => handleClick(imagem)}
                        >
                          <img
                            id={imagem.id}
                            src={imagem.media_url}
                            alt={imagem.permalink}
                            style={{
                              height: 400,
                              cursor: "pointer",
                              objectFit: "cover",
                            }}
                            className={
                              listImagensSelecionadas.includes(imagem)
                                ? classes.checked
                                : null
                            }
                          />
                        </Stack>
                      </Grid>
                    ))}
                  </Masonry>
                </Container>
              </Grid>
            </Container>
          ) : (
            // S3
            <Container>
              <Grid container spacing={2}>
                <Container>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontSize: "18px" }}>
                      Selecione as imagens que deseja adicionar ao álbum
                    </Typography>
                    <label htmlFor="file-input">
                      <input
                        id="file-input"
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        hidden
                        multiple
                      />
                      <CustomButton
                        component="span"
                        sx={{
                          width: "100%",
                          height: "50px",
                          backgroundColor: "#1E1E1E",
                          color: "#ffffff",
                          borderRadius: 5,
                          marginTop: "20px",
                        }}
                      >
                        Selecione todas as imagens
                      </CustomButton>
                    </label>
                  </Grid>
                </Container>
              </Grid>
            </Container>
          )}
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mb={5}>
          <Grid container>
            <Grid item xl={9} lg={9} md={9} sm={9} xs={9}></Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              <Stack width="100%">
                <Container>
                  <CustomButton
                    loading={btnLoading}
                    variant="contained"
                    color="secondary"
                    height="100%"
                    type="submit"
                    form="album-form"
                    fullWidth
                  >
                    Cadastrar
                  </CustomButton>
                </Container>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CadastroAlbum;
