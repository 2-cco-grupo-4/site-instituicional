import useStyles from "./Header.styles";
import OptionNav from "atoms/OptionNav";
import CustomButton from "atoms/CustomButton/CustomButton";
import {
  Box,
  Typography,
  Stack,
  InputBase,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Menu,
  Grid,
  InputAdornment,
  TextField,
  Autocomplete,
} from "@mui/material";
import { HEADER_HEIGHT, ROUTES } from "utils/constants";
import Container from "atoms/Container";
import { useUserContext } from "contexts";
import { useNavigate } from "react-router-dom";
import CustomPopover from "molecules/CustomPopover";
import LogoPicme from "atoms/LogoPicme";
import iconSearch from "assets/icons/search.svg";
import { useState, useRef, useEffect } from "react";
import { PESQUISA } from "service/pesquisa";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Controller, useForm } from "react-hook-form";

const Header = ({ type }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { autenticado, token } = useUserContext();
  const [open, setState] = useState(false);
  const inputRef = useRef(null);
  const [listaPesquisa, setListaPesquisa] = useState([]);

  const { handleSubmit, control, setValue, reset } = useForm();

  const testador = ["Lista 1", "Lista 2", "Lista 3", "Lista 4"];

  const [termoBusca, setTermoBusca] = useState("");

  const handleNavigation = (route) => {
    navigate(route);
  };

  useEffect(() => {
    setTermoBusca("");
  }, []);

  const buscar = async (pesquisa) => {
    try {
      const response = await PESQUISA.TERMO(pesquisa, token);
      if (response.status === 200) {
        setListaPesquisa(response.data);
      } else if (response.status === 204) {
        setListaPesquisa([]);
      }
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const Content = (props) => {
    switch (type) {
      case 1:
        return (
          <Box className={classes.navbarNav}>
            <OptionNav title="Galeria" navigation="#galeria" />
            <OptionNav title="Quem Somos" navigation="#quem-somos" />
            <OptionNav title="Produto" navigation="#produto" />
            <OptionNav title="Explorar" navigation="#explorar" />
          </Box>
        );
      case 2:
        return (
          <Box display="flex" flexDirection="row">
            {console.log("Lista de Pesquisa:", listaPesquisa)}
            <Controller
              name="idPesquisa"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  inputValue={termoBusca}
                  options={
                    listaPesquisa.length > 0
                      ? listaPesquisa.map((pesquisa) => pesquisa.termo)
                      : []
                  }
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => {
                    const selectedTermo = listaPesquisa.find(
                      (termo) => termo.termo === newValue
                    );
                    if (selectedTermo) {
                      setTermoBusca(selectedTermo.termo);
                    } else {
                      setTermoBusca(newValue || "");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      id="busca"
                      label="Pesquise"
                      autoFocus="autoFocus"
                      sx={{
                        width: 600,
                      }}
                      onChange={(e) => {
                        setTermoBusca(e.target.value);
                        field.onChange(e.target.value);
                        buscar(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon sx={{ fontSize: 26 }} />
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  )}
                ></Autocomplete>
              )}
            ></Controller>
          </Box>
        );
      default:
        return <></>;
    }
  };

  return (
    <Container
      height={HEADER_HEIGHT}
      bgcolor="white.main"
      display="flex"
      alignItems="center"
      justifyContent={{ sm: "space-between", xs: "center" }}
      position="sticky"
      top={0}
      zIndex={1000}
      className={classes.navbar}
    >
      <LogoPicme />
      <Content />
      {autenticado ? (
        <CustomPopover>
          <Stack>Sair</Stack>
        </CustomPopover>
      ) : type === 3 ? (
        <Box className={classes.navBotoes}>
          <Typography sx={{ marginRight: 2 }}>Já possui conta?</Typography>
          <CustomButton
            type="button"
            onClick={() => handleNavigation(ROUTES.LOGIN)}
            variant="outlined"
            color="secondary"
          >
            Login
          </CustomButton>
        </Box>
      ) : (
        <Box className={classes.navBotoes}>
          <CustomButton
            type="button"
            onClick={() => handleNavigation(ROUTES.LOGIN)}
            variant="outlined"
            sx={{ marginRight: 2 }}
            color="secondary"
          >
            Login
          </CustomButton>
          <CustomButton
            type="button"
            onClick={() => handleNavigation(ROUTES.CHOOSE_PROFILE)}
            variant="contained"
            color="primary"
          >
            Cadastro
          </CustomButton>
        </Box>
      )}

      <AppBar
        position="absolute"
        sx={{
          display: { lg: "none", md: "none", sm: "none", xs: "flex" },
          backgroundColor: "white.main",
        }}
      >
        <Toolbar>
          <Grid container spacing={0}>
            <Grid
              item
              xs={10}
              display="flex"
              alignItems="center"
              paddingLeft={2}
            >
              <LogoPicme paddingLeft={0}></LogoPicme>
            </Grid>

            <Grid item xs={1}>
              <IconButton
                edge="end"
                color="#000"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                sx={{ mr: 0, display: { xs: "block", sm: "none" }, left: 0 }}
              >
                <MenuIcon style={{ fontSize: 20 }} />
              </IconButton>

              <Drawer
                display="flex"
                flexDirection="column"
                anchor="right"
                variant="temporary"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <Box className={classes.navbarNavApp} px={1} py={3}>
                  <Box className={classes.navbarLinksApp}>
                    <OptionNav title="Galeria" navigation="#galeria" />
                    <OptionNav title="Quem Somos" navigation="#quem-somos" />
                    <OptionNav title="Produto" navigation="#produto" />
                    <OptionNav title="Explorar" navigation="#explorar" />
                  </Box>

                  <Box className={classes.navbarBotoesApp}>
                    <CustomButton
                      type="button"
                      onClick={() => handleNavigation(ROUTES.LOGIN)}
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                      color="secondary"
                    >
                      Login
                    </CustomButton>
                    <CustomButton
                      type="button"
                      onClick={() => handleNavigation(ROUTES.CHOOSE_PROFILE)}
                      variant="contained"
                      color="primary"
                    >
                      Cadastro
                    </CustomButton>
                  </Box>
                </Box>
              </Drawer>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
