// import { Container } from "@mui/material"
import useStyles from "./DashAdmin.styles";
import Header from "molecules/Header";

import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  Drawer,
  Divider,
  AppBar,
  Grid,
} from "@mui/material";
import Container from "atoms/Container";
import CaixaKpi from "atoms/CaixaKpi/CaixaKpi";
import CardChartPie from "atoms/CardChartPie/CardChartPie";
import CardBarChart from "atoms/CardBarChart/CardBarChart";
import CardBarLineChart from "atoms/CardBarLineChart/CardBarLineChart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import CustomPopover from "molecules/CustomPopover";
import CustomPopoverDash from "atoms/CustomPopoverDash";
import { ADMIN } from "service/dashboard";
import axios from "axios";
import { Await } from "react-router-dom";
import { CLIENTE } from "service/user";
import { useUserContext } from "contexts";
import LogoPicme from "atoms/LogoPicme";

import BarChartIcon from "@mui/icons-material/BarChart";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CardStackedBarChart from "atoms/CardStackedBarChart";

const DashAdmin = () => {
  const defaultValues = {
    metrica: "marketing",
  };

  const [metrica, setMetrica] = useState(defaultValues.metrica);

  const [dataBar, setDataBar] = useState([{}]);

  const [dataClienteSemana, setDataClienteSemana] = useState([{}]);

  const [dataBarFaixaEtaria, setDataBarFaixaEtaria] = useState([{}]);

  const [dataBarFaixaEtariaTema, setDataBarFaixaEtariaTema] = useState([{}]);

  const [dataClientesFotografos, setDataClientesFotografos] = useState([{}]);

  const [dataContatosConvertidos, setDataContatosConvertidos] = useState([{}]);

  const [dataProgressaoUsuarios, setDataProgressaoUsuarios] = useState([{}]);

  const [dataProgressaoSessoes, setDataProgressaoSessoes] = useState([{}]);

  const [dataKpi1, setDataKpi1] = useState([{}]);

  const [dataKpi2, setDataKpi2] = useState([{}]);

  const [dataKpi3, setDataKpi3] = useState([{}]);

  const [valorKpi1, setValorKpi1] = useState(0);

  const [valorKpi2, setValorKpi2] = useState(0);

  const [valorKpi3, setValorKpi3] = useState(0);

  const [porcentagemKpi1, setPorcentagemKpi1] = useState(0);

  const [porcentagemKpi2, setPorcentagemKpi2] = useState(0);

  const [porcentagemKpi3, setPorcentagemKpi3] = useState(0);

  const { token } = useUserContext();

  const [conexao, setConexao] = useState();

  const classes = useStyles();

  //   getViewBarChartTemaContato
  //             .then(function(response){
  //                 console.log(response)
  //             });

  useEffect(() => {
    axios.create({
      baseURL: "http://52.45.6.243:8080",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        // 'Authorization': `Bearer ${token}`
      },
    });

    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
  });

  useEffect(() => {
    axios
      .get("http://52.45.6.243:8080/admin/contagem-tema-contato", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataBar(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/contagem-clientes-semana", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataClienteSemana(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/faixa-etaria-clientes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataBarFaixaEtaria(response.data);
      });

    axios
      .get(
        "http://52.45.6.243:8080/admin/faixa-etaria-clientes-tema/Casamentos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setDataBarFaixaEtariaTema(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/total-clientes-fotografos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataClientesFotografos(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/sessoes-finalizadas-canceladas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataContatosConvertidos(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/progressao-usuarios-mes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataProgressaoUsuarios(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/progressao-relizacao-sessoes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataProgressaoSessoes(response.data);
      });

    axios
      .get("http://52.45.6.243:8080/admin/kpi-total-usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataKpi1(response.data);
        var lista = response.data;
        if (lista[2].quantidade == 0) {
          setPorcentagemKpi1(lista[1].quantidade * 100);
        } else if (lista[1].quantidade == 0) {
          setPorcentagemKpi1(lista[2].quantidade * -100);
        } else {
          setPorcentagemKpi1(
            (lista[1].quantidade * 100) / lista[2].quantidade - 100
          );
        }
        setValorKpi1(lista[0].quantidade);
      });

    axios
      .get("http://52.45.6.243:8080/admin/kpi-sessoes-realizadas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataKpi2(response.data);
        var lista = response.data;
        if (lista[2].quantidade == 0) {
          setPorcentagemKpi2(lista[1].quantidade * 100);
        } else if (lista[1].quantidade == 0) {
          setPorcentagemKpi2(lista[2].quantidade * -100);
        } else {
          setPorcentagemKpi2(
            (lista[1].quantidade * 100) / lista[2].quantidade - 100
          );
        }
        setValorKpi2(lista[0].quantidade);
      });

    axios
      .get("http://52.45.6.243:8080/admin/kpi-total-acessos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDataKpi3(response.data);
        var lista = response.data;
        if (lista[2].quantidade == 0) {
          setPorcentagemKpi3(lista[1].quantidade * 100);
        } else if (lista[1].quantidade == 0) {
          setPorcentagemKpi3(lista[2].quantidade * -100);
        } else {
          setPorcentagemKpi3(
            (lista[1].quantidade * 100) / lista[2].quantidade - 100
          );
        }
        setValorKpi3(lista[0].quantidade);
      });
  }, [metrica]);

  const model = [
    {
      Mes: "Maio",
      Agendaram: 5,
      Total: 8,
      "Nao Agendaram": 3,
    },
    {
      Mes: "Junho",
      Agendaram: 8,
      Total: 22,
      "Nao Agendaram": 14,
    },
    {
      Mes: "Julho",
      Agendaram: 16,
      Total: 25,
      "Nao Agendaram": 9,
    },
    {
      Mes: "Agosto",
      Agendaram: 5,
      Total: 19,
      "Nao Agendaram": 14,
    },
    {
      Mes: "Setembro",
      Agendaram: 19,
      Total: 21,
      "Nao Agendaram": 2,
    },
  ];

  const jsonModelString = JSON.stringify(model[0]);
  const jsonModel = JSON.parse(jsonModelString);

  const keyName = Object.keys(jsonModel)[0];
  const valueName1 = Object.keys(jsonModel)[1];
  const valueName2 = Object.keys(jsonModel)[3];

  return (
    <Stack sx={{ transition: "2s all ease" }}>
      <Box>
        {/* <AppBar position="fixed"> */}
        <Drawer
          variant="permanent"
          open={true}
          PaperProps={{
            sx: {
              backgroundColor: "#1E1E1E !important",
              width: "7.5%",
              height: "100vh",
              display: "flex",
              flexDirection: "columns",
              justifyContent: "space-around",
              alignItems: "center",
            },
          }}
        >
          <Box>
            <LogoPicme />
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              p={1}
              mb={5}
              sx={{ backgroundColor: "#ffffff", borderRadius: 5 }}
            >
              <BarChartIcon
                fontSize="large"
                style={{ color: "#1E1E1E", fontSize: 40 }}
              />
            </Box>
            <Box p={1} mb={5}>
              <ContentPasteGoIcon
                fontSize="large"
                style={{ color: "#ffffff", fontSize: 40 }}
              />
            </Box>
            <Box p={1} mb={5}>
              <SettingsIcon
                fontSize="large"
                style={{ color: "#ffffff", fontSize: 40 }}
              />
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PersonIcon style={{ color: "#ffffff", fontSize: 40 }} />
              <Typography
                fontSize="18px"
                sx={{ fontWeight: "bold", color: "#ffffff" }}
              >
                Admin
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <LogoutIcon style={{ color: "#ffffff", fontSize: 30 }} />
              <Typography
                fontSize="14px"
                ml={2}
                sx={{ fontWeight: "bold", color: "#ffffff" }}
              >
                Sair
              </Typography>
            </Box>
          </Box>
        </Drawer>
        {/* </AppBar> */}
      </Box>

      <Box
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        // py={4}
        sx={{ width: "92.5%", backgroundColor: "#EFEFEF" }}
        ml="7.5%"
      >
        <Container
          py={3}
          flexDirection="row"
          justifyContent="center"
          paddingLeft="0"
          paddingRight="0"
          width="100%"
        >
          <Container
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            paddingLeft="0"
            paddingRight="0"
            width="100%"
          >
            <Typography
              fontSize="16px"
              color="black"
              textAlign="center"
              flex={1}
            >
              Você está acessando as métricas de{" "}
              <Box display="inline" fontWeight="bold">
                {metrica}
              </Box>
            </Typography>

            <CustomPopoverDash>
              <Stack
                p={2}
                paddingBottom={1}
                paddingLeft={8}
                paddingRight={8}
                className={classes.popoupOption}
                onClick={() => setMetrica("marketing")}
              >
                Marketing
              </Stack>
              <hr className={classes.linha}></hr>
              <Stack
                p={2}
                paddingTop={1}
                paddingLeft={8}
                paddingRight={8}
                className={classes.popoupOption}
                onClick={() => setMetrica("usuários")}
              >
                Usuários
              </Stack>
            </CustomPopoverDash>
          </Container>
        </Container>

        {metrica === "marketing" ? (
          <>
            <Box>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={4}
                sx={{
                  width: "100%",
                  margin: "0",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={10}
                  xs={10}
                  sx={{
                    paddingLeft: "0 !important",
                    // paddingTop: "0 !important",
                  }}
                >
                  <Grid
                    container
                    rowSpacing={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      height: "100%",
                    }}
                  >
                    <Grid item md={12} sx={{ paddingLeft: "0 !important" }}>
                      <CaixaKpi
                        valorKpi={valorKpi1}
                        textoKpi="Usuários"
                        porcentagem={porcentagemKpi1}
                      ></CaixaKpi>
                    </Grid>
                    <Grid item md={12} sx={{ paddingLeft: "0 !important" }}>
                      <CaixaKpi
                        valorKpi={valorKpi2}
                        textoKpi="Sessões Realizadas"
                        porcentagem={porcentagemKpi2}
                      ></CaixaKpi>
                    </Grid>
                    <Grid item md={12} sx={{ paddingLeft: "0 !important" }}>
                      <CaixaKpi
                        valorKpi={valorKpi3}
                        textoKpi="Acessos"
                        porcentagem={porcentagemKpi3}
                      ></CaixaKpi>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xl={8}
                  lg={8}
                  md={8}
                  sm={10}
                  xs={10}
                  sx={{
                    paddingLeft: "0 !important",
                    // paddingTop: "0 !important",
                  }}
                >
                  <CardStackedBarChart
                    tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                    width="100%"
                    data={model}
                  ></CardStackedBarChart>
                  {/* <CardChartPie
                    tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                    data={dataClienteSemana}
                    width="100%"
                  ></CardChartPie> */}
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={4}
                rowSpacing={4}
                sx={{
                  width: "100%",
                  margin: "0",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Grid
                  item
                  xl={5}
                  lg={5}
                  md={5}
                  sm={10}
                  xs={10}
                  sx={{
                    paddingLeft: "0 !important",
                    // paddingTop: "0 !important",
                  }}
                >
                  <CardBarChart
                    tituloPieChart="Faixa etária dos clientes"
                    data={dataBarFaixaEtaria}
                    width="100%"
                  />
                </Grid>
                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={10}
                  xs={10}
                  sx={{
                    paddingLeft: "0 !important",
                    // paddingTop: "0 !important",
                  }}
                >
                  <CardBarChart
                    tituloPieChart="Temas com mais ‘contatos’ iniciados"
                    data={dataBar}
                    width="100%"
                  ></CardBarChart>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Container
              py={3}
              flexDirection="row"
              justifyContent="space-between"
              paddingLeft="0"
              paddingRight="0"
            >
              <CardChartPie
                tituloPieChart="Base de usuários cadastrados"
                data={dataClientesFotografos}
                width="40%"
              ></CardChartPie>

              <CardBarLineChart
                tituloPieChart="Progressão de novos usuários cadastrados"
                data={dataProgressaoUsuarios}
                width="55%"
              ></CardBarLineChart>
            </Container>

            <Container
              py={3}
              flexDirection="row"
              justifyContent="space-between"
              paddingLeft="0"
              paddingRight="0"
            >
              <CardChartPie
                tituloPieChart="Contatos convertidos em sessões"
                width="40%"
                data={dataContatosConvertidos}
              ></CardChartPie>

              <CardBarLineChart
                tituloPieChart="Progressão sessões de fotos realizadas"
                data={dataProgressaoSessoes}
                width="55%"
              ></CardBarLineChart>
            </Container>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default DashAdmin;
