import useStyles from "./Login.styles";
import Container from "atoms/Container";
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import LogoPicme from "atoms/LogoPicme";
import { useNavigate } from "react-router-dom";
import CustomButton from "atoms/CustomButton";
import { useState } from "react";
import goBackArrow from "assets/icons/go-back-arrow.svg";
import { ROUTES } from "utils/constants";
import { userDataSchema } from "./Login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useAsyncState } from "hooks/useAsyncState";
import { LOGIN } from "service/user";
import { useUserContext } from "contexts";

const defaultValue = {
  email: "",
  senha: "",
};

const Login = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const { token, setToken } = useUserContext();
  const { nome, setNome } = useUserContext();
  const { id, setId } = useUserContext();
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userDataSchema) });

  const onSubmitHandler = async (data) => {
    setBtnLoading(true);

    await LOGIN(data)
      .then((response) => {
        console.log(response.data.token);
        console.log(response.data.nome);
        var role = response.data.tipoUsuario;
        console.log(role);
        setToken(response.data.token);
        setNome(response.data.nome);
        setId(response.data.id);
        if (role === 0) {
          navigate(ROUTES.DASH_ADMIN);
        } else {
          navigate(ROUTES.FEED);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <Stack direction="row" alignItems="top">
      <Stack
        display={{ md: "flex", sm: "none", xs: "none" }}
        className={classes.banner}
      >
        <Container py={4}>
          <img
            src={goBackArrow}
            alt="go-back-arrow"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTES.HOME)}
          />
        </Container>
      </Stack>
      <Stack
        width={{ md: "40%", sm: "100%", xs: "100%" }}
        className={classes.content}
      >
        <Container
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          py={4}
          width="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            sx={{
              position: "absolute",
              top: theme.spacing(4),
            }}
          >
            <LogoPicme height={36} />
          </Box>

          <Stack width="100%" alignItems="center" spacing={3}>
            <Typography variant="subtitle-small-semibold">Login</Typography>
            <Stack width="100%" justifyContent="center" spacing={3}>
              <TextField
                id="email-ipt"
                name="email"
                label="E-mail"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                id="password-ipt"
                name="senha"
                type="password"
                label="Senha"
                fullWidth
                {...register("senha")}
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />
            </Stack>
            <CustomButton
              loading={btnLoading}
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Entrar
            </CustomButton>
            <Stack
              direction={{ sm: "row", xs: "column" }}
              alignItems="center"
              spacing={0.5}
            >
              <Typography sx={{ fontWeight: 300 }}>
                Não tem um cadastro?
              </Typography>
              <Typography
                color="primary"
                onClick={() => navigate(ROUTES.REGISTER("cliente"))}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Cadastre-se
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Login;
