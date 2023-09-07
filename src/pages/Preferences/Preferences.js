import Container from "atoms/Container/Container";
import useStyles from "./Preferences.styles";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import LogoPicme from "atoms/LogoPicme/LogoPicme";
import CustomButton from "atoms/CustomButton/CustomButton";

import casamento from "assets/img/tema-casamento.png";
import esportivo from "assets/img/tema-esportivo.png";
import debutante from "assets/img/tema-debutante.png";
import familia from "assets/img/tema-familia.png";
import formatura from "assets/img/tema-formatura.png";
import aniversario from "assets/img/tema-aniversario.png";
import { useEffect, useState, useNavigate } from "react";
import { ROUTES } from "utils/constants";

const PREFERENCES_LIST = [
  {
    image: casamento,
    name: "Casamento",
  },
  {
    image: esportivo,
    name: "Esportivo",
  },
  {
    image: debutante,
    name: "Debutante",
  },
  {
    image: familia,
    name: "Família",
  },
  {
    image: formatura,
    name: "Formatura",
  },
  {
    image: aniversario,
    name: "Aniversário",
  },
];

const Preferences = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleClick = (e) => {
    if (selectedThemes.find((selectedTheme) => selectedTheme === e.target.id)) {
      setSelectedThemes(
        selectedThemes.filter((selectedTheme) => selectedTheme !== e.target.id)
      );
    } else {
      setSelectedThemes([...selectedThemes, e.target.id]);
    }
  };

  const handleNavigate = () => {
    navigate(ROUTES.FEED);
  };

  return (
    <Container flexDirection="column" py={4} rowGap={8}>
      <Stack flexDirection="column" rowGap={2}>
        <Stack flexDirection="row" width="100%" justifyContent="space-between">
          <Stack flexDirection="column">
            <Typography variant="subtitle-small-bold">
              Quais são seus interesses?
            </Typography>
            <Typography>
              Selecione os tópicos com os quais você mais se identifica!
            </Typography>
          </Stack>
          <LogoPicme />
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle-small-bold">Tema</Typography>
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={handleNavigate}
          >
            Continuar
          </CustomButton>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {PREFERENCES_LIST.map((info, i) => (
          <Grid key={info.name} item md={4}>
            <Stack
              className={classes.bg}
              sx={{
                backgroundImage: `url(${info.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {selectedThemes.find(
                (selectedTheme) => selectedTheme === info.name
              ) && (
                <Stack
                  id={info.name}
                  onClick={handleClick}
                  className={classes.check}
                />
              )}
              <Stack
                id={info.name}
                onClick={handleClick}
                className={classes.content}
                sx={{
                  background: selectedThemes.find(
                    (selectedTheme) => selectedTheme === info.name
                  )
                    ? "rgba(0,0,0,0.8)"
                    : "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 66.67%, #000 85.42%)",
                }}
              >
                <Typography variant="paragraph-medium-bold">
                  {info.name}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Preferences;
