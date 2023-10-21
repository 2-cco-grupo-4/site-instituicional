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
} from "@mui/material";
import Container from "atoms/Container";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FOTOGRAFO } from "service/user";
import CustomButton from "atoms/CustomButton";
import { INSTAGRAM } from "service/instagram";
import { useUserContext } from "contexts";
import { Masonry } from "@mui/lab";
import iconCheck from "assets/icons/round-check.svg";

const CadastroAlbum = () => {
  const classes = useStyles();
  const { token, id, nome, tokenSolicitacao } = useUserContext();
  const [listImagensInsta, setListImagensInsta] = useState([{}]);
  const [btnLoading, setBtnLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const [listImagensSelecionadas, setListImagensSelecionadas] = useState([]);

  useEffect(() => {
    const ChamadaApi = async () => {
      INSTAGRAM.LISTAR_IMAGENS_INSTA(token, tokenSolicitacao).then(
        (response) => {
          console.log(`RESPOSTA INSTA: ${JSON.stringify(response.data)}`);
          setListImagensInsta(response.data);
        }
      );
    };
    ChamadaApi();
  }, [tokenSolicitacao]);

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

    console.log(data);
    console.log(listImagensSelecionadas);
    // await FOTOGRAFO.CADASTRAR_ALBUM(id, data, listImagensSelecionadas).then(
    //   (response) => {
    //     console.log(response);
    //   }
    // );
  };

  useEffect(() => {
    console.log(listImagensSelecionadas);
  }, [listImagensSelecionadas]);

  console.log("teste");

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
          <Container
            component="form"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Stack width="30%">
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
            <Stack width="30%">
              <Controller
                name="tema"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="tema-ipt"
                    label="Tema"
                    width="100%"
                  />
                )}
              ></Controller>
            </Stack>
            <Stack width="30%">
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
            <Stack width="6%">
              <CustomButton
                loading={btnLoading}
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth
              >
                Cadastrar
              </CustomButton>
            </Stack>
          </Container>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} margin={0}>
          <Container>
            <Typography>
              Selecione as imagens que você deseja adicionar nesse álbum:
            </Typography>
          </Container>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Container>
            <Grid container spacing={2}>
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
                        style={{ height: "auto", cursor: "pointer" }}
                        className={
                          listImagensSelecionadas.includes(imagem.id)
                            ? classes.checked
                            : null
                        }
                      />
                    </Stack>
                  </Grid>
                ))}
              </Masonry>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CadastroAlbum;
