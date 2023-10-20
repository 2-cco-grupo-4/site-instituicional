import useStyles from "./CadastroAlbum.styles";
import Header from "molecules/Header";
import { Grid, Box, Stack, Typography } from "@mui/material";

const CadastroAlbum = () => {
  const classes = useStyles();

  console.log("teste");

  return (
    <Stack>
      <Header type={2} />

      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          <Typography>Teste</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CadastroAlbum;
