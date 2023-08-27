import useStyles from "./PerfilFotografo.styles";
import { Stack, Typography } from "@mui/material";
import Container from "atoms/Container";
import CustomButton from "atoms/CustomButton/CustomButton";
import Header from "molecules/Header";

const PerfilFotografo = () => {
  const classes = useStyles();

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Header type={2} />
      <Container className={classes.banner}></Container>
      <Typography fontSize={"16px"} margin={"12px"}>{"Home > Renata Fereira"}</Typography>
      <Stack className={classes.cabecalho}>
      </Stack>
      <Stack className={classes.textoCabecalho} >
        <Typography fontWeight={"bold"} fontSize={"24px"}>Renata Fereira</Typography>
        <Typography color={"grey"} fontWeight={"bold"} paddingTop={"10px"}>@referphots</Typography>
        <Typography marginBottom={"15px"} paddingTop={"10px"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</Typography>
        <CustomButton variant={"contained"}> Editar Perfil</CustomButton>
      </Stack>
    </Stack>
  );
};

export default PerfilFotografo;
