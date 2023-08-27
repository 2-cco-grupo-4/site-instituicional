import { Box, Container, Stack, Typography } from "@mui/material";
import useStyles from "./CustomButtonPerfilFotografo.syles";

const CustomButtonPerfilFotografo = ({ campo1, campo2 }) => {
  const classes = useStyles();

  return (
      <Box className={classes.section}>
        <Container className={classes.sectionOne}>
          <Typography fontWeight={"bold"}>{campo1}</Typography>
        </Container>
        <Container className={classes.sectionTwo}>
          <Typography fontWeight={"bold"}>{campo2}</Typography>
        </Container>
      </Box>
  );
};

export default CustomButtonPerfilFotografo;
