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
  useTheme,
  Avatar,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Container from "atoms/Container";
import CaixaKpi from "atoms/CaixaKpi/CaixaKpi";
import CardChartPie from "atoms/CardChartPie/CardChartPie";
import CardBarChart from "atoms/CardBarChart/CardBarChart";
import CardDoubleBarChart from "atoms/CardDoubleBarChart";
import CardBarLineChart from "atoms/CardBarLineChart/CardBarLineChart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import CustomPopover from "molecules/CustomPopover";
import CustomPopoverDash from "atoms/CustomPopoverDash";
import { ADMIN } from "service/dashboard";
import axios from "axios";
import { Await, useNavigate } from "react-router-dom";
import { CLIENTE } from "service/user";
import { useUserContext } from "contexts";
import LogoPicme from "atoms/LogoPicme";

import BarChartIcon from "@mui/icons-material/BarChart";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CardStackedBarChart from "atoms/CardStackedBarChart";
import { ROUTES } from "utils/constants";
import { stringAvatar } from "utils/helpers/string";
import CardSanekyChartStyles from "atoms/CardSankeyChart/CardSanekyChart.styles";
import CardSankeyChart from "atoms/CardSankeyChart/CardSankeyChart";
import CardTreeMapChart from "atoms/CardTreeMapChart/CardTreeMapChart";

const DashAdmin = () => {
  const defaultValues = {
    metrica: "marketing",
  };

  const theme = useTheme()


  const [metrica, setMetrica] = useState(defaultValues.metrica);

  const [mesReferencia, setMesReferencia] = useState("novembro");

  const [anoReferencia, setAnoReferencia] = useState(2023);

  const [dataBar, setDataBar] = useState([{}]);

  const [dataClienteSemana, setDataClienteSemana] = useState([{}]);

  const [dataBarFaixaEtaria, setDataBarFaixaEtaria] = useState([{}]);

  const [dataBarFaixaEtariaTema, setDataBarFaixaEtariaTema] = useState([{}]);

  const [dataClientesFotografos, setDataClientesFotografos] = useState([{}]);

  const [dataContatosConvertidos, setDataContatosConvertidos] = useState([{}]);

  const [dataProgressaoUsuarios, setDataProgressaoUsuarios] = useState([{}]);

  const [dataProgressaoSessoes, setDataProgressaoSessoes] = useState([{}]);

  const [dataFluxoConversaoSessoes, setDataFluxoConversaoSessoes] = useState([{}]);

  const [dataFormasPagamentos, setDataFormasPagamentos] = useState([{}]);

  const [dataKpi1, setDataKpi1] = useState([{}]);

  const [dataKpi2, setDataKpi2] = useState([{}]);

  const [dataKpi3, setDataKpi3] = useState([{}]);

  const [valorKpi1, setValorKpi1] = useState(0);

  const [valorKpi2, setValorKpi2] = useState(0);

  const [valorKpi3, setValorKpi3] = useState(0);

  const [porcentagemKpi1, setPorcentagemKpi1] = useState(0);

  const [porcentagemKpi2, setPorcentagemKpi2] = useState(0);

  const [porcentagemKpi3, setPorcentagemKpi3] = useState(0);

  const { nome, token } = useUserContext();

  const navigate = useNavigate();

  function formatJsonClientesSemana(response) {
    var jsonModel;
    for (let i = 0; i < response.data.length; i++) {
      jsonModel[i] = {
        Agendaram: response.data[i].agendaram,
        Total: response.data[i].total,
        "Nao Agendaram": response.data[i].naoAgendaram,
      };
    }
  }

  const classes = useStyles();

  const dataTreeMap = 
  [
    {
      name: "Categoria 1",
      value: 10
    },
    {
      name: "Categoria 2",
      value: 10
    },
    {
      name: "Categoria 3",
      value: 10
    },
    {
      name: "Categoria 4",
      value: 10
    },
    {
      name: "Categoria 5",
      value: 10
    },
    {
      name: "Categoria 6",
      value: 10
    },
    {
      name: "Categoria 7",
      value: 10
    },
    {
      name: "Categoria 8",
      value: 10
    }
  ]

  const dataTeste = {
    "nodes": [
      {
        "name": "Proposta"
      },
      {
        "name": "Aceita"
      },
      {
        "name": "Em Negociação"
      },
      {
        "name": "Agendada"
      },
      {
        "name": "Realizada"
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1,
        "value": 4210
      },
      {
        "source": 1,
        "target": 2,
        "value": 3210
      },
      {
        "source": 2,
        "target": 3,
        "value": 1310
      },
      {
        "source": 3,
        "target": 4,
        "value": 780
      }
    ]
  };
     

  useEffect(() => {
    const fetchData = async () => {
      try {
        ADMIN.CONTAGEM_TEMA_CONTATO(token, mesReferencia, anoReferencia).then((response) => {
          console.log("Teste de Retorno: ", response.data);
          setDataBar(response.data);
        });

        ADMIN.FLUXO_CONVERSAO_SESSOES(token, mesReferencia, anoReferencia).then((response) => {
          console.log("Teste de Retorno: ", response.data);
          setDataFluxoConversaoSessoes(response.data);
        });

        ADMIN.PAGAMENTS_MAIS_UTILIZADOS(token, mesReferencia, anoReferencia).then((response) => {
          console.log("Teste de Retorno: ", response.data);
          console.log("Teste de Query: ", `MES: ${mesReferencia} | ANO: ${anoReferencia} | TIPO DE ANO: ${typeof anoReferencia}`);
          setDataFormasPagamentos(response.data);
        });

        ADMIN.CONTAGEM_CLIENTES_SEMANA(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataClienteSemana(response.data);
        });

        ADMIN.FAIXA_ETARIA_CLIENTES(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataBarFaixaEtaria(response.data);
        });
        ADMIN.BASE_USUARIOS_CADASTRADOS(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataClientesFotografos(response.data);
        });
        ADMIN.CONTATOS_CONVERTIDOS_SESSOES(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataContatosConvertidos(response.data);
        });
        ADMIN.PROGRESSAO_NOVOS_USUARIOS(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataProgressaoUsuarios(response.data);
        });
        ADMIN.PROGRESSAO_SESSOES_MES(token).then((response) => {
          // console.log("Teste de Retorno: ", response.data);
          setDataProgressaoSessoes(response.data);
        });

        ADMIN.KPI_SESSOES_REALIZADAS(token).then((response) => {
          // console.log("Teste de Retorno KPI 2: ", response.data);
          setDataKpi2(response.data);
          var lista = response.data;
          if (lista[1].quantidade == 0) {
            setPorcentagemKpi2(lista[0].quantidade * 100);
          } else if (lista[0].quantidade == 0) {
            setPorcentagemKpi2(lista[1].quantidade * -100);
          } else {
            setPorcentagemKpi2(
              (lista[1].quantidade * 100) / lista[0].quantidade - 100
            );
          }
          setValorKpi2(lista[0].quantidade);
        });

        ADMIN.KPI_TOTAL_ACESSOS(token).then((response) => {
          // console.log("Teste de Retorno KPI 3: ", response.data);
          setDataKpi3(response.data);
          var lista = response.data;
          if (lista[1].quantidade == 0) {
            setPorcentagemKpi3(lista[0].quantidade * 100).toFixed(2);
          } else if (lista[0].quantidade == 0) {
            setPorcentagemKpi3(lista[1].quantidade * -100).toFixed(2);
          } else {
            setPorcentagemKpi3(
              ((lista[1].quantidade * 100) / lista[0].quantidade - 100).toFixed(
                2
              )
            );
          }
          setValorKpi3(lista[0].quantidade);
        });

        ADMIN.KPI_TOTAL_USUARIOS(token).then((response) => {
          // console.log("Teste de Retorno KPI 1: ", response.data);
          setDataKpi1(response.data);

          var lista = response.data;
          if (lista[1].quantidade == 0) {
            setPorcentagemKpi1(lista[0].quantidade * 100).toFixed(2);
          } else if (lista[0].quantidade == 0) {
            setPorcentagemKpi1(lista[1].quantidade * -100).toFixed(2);
          } else {
            setPorcentagemKpi1(
              ((lista[1].quantidade * 100) / lista[0].quantidade - 100).toFixed(
                2
              )
            );
          }
          setValorKpi1(lista[0].quantidade);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, mesReferencia, anoReferencia]);

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
            <LogoPicme dash={true} height={theme.spacing(4)} />
          </Box>
          <Divider sx={{ backgroundColor: "#ffffff", width: "60%" }} />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box
              p={1}
              mb={5}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: theme.shape.borderRadius,
                cursor: "pointer",
              }}
              onClick={() => navigate(ROUTES.DASH_ADMIN)}
            >
              <BarChartIcon
                fontSize="large"
                style={{ color: "#1E1E1E", fontSize: theme.spacing(4) }}
              />
            </Box>
            <Box
              p={1}
              mb={5}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.ARQUIVOS_ADMIN)}
            >
              <ContentPasteGoIcon
                fontSize="large"
                style={{ color: "#ffffff", fontSize: theme.spacing(4) }}
              />
            </Box>
            <Box p={1} sx={{ cursor: "pointer" }}>
              <SettingsIcon
                fontSize="large"
                style={{ color: "#ffffff", fontSize: theme.spacing(4) }}
              />
            </Box>
          </Box>
          <Divider sx={{ backgroundColor: "#ffffff", width: "60%" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar {...stringAvatar(nome ? (nome) : ("Teste"))}>
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.clear();
                  navigate(ROUTES.HOME);
                }}
              >
                <LogoutIcon
                  style={{ color: "#ffffff", fontSize: 25, paddingTop: "10px" }}
                />
              </Box>
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
              // textAlign="center"
              flex={1}
            >
              Você está acessando as métricas de{" "}
              <Box display="inline" fontWeight="bold">
                {metrica}
              </Box>
              <Box display="flex" fontWeight="bold" width="30%" mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="mes-referencia">Mês</InputLabel>
                  <Select
                    labelId="mes-referencia"
                    id="mes-referencia"
                    label="Mês"
                    value={mesReferencia}
                    onChange={(e) => setMesReferencia(e.target.value)}
                  >
                    <MenuItem value={"january"}>Janeiro</MenuItem>
                    <MenuItem value={"february"}>Fevereiro</MenuItem>
                    <MenuItem value={"march"}>Março</MenuItem>
                    <MenuItem value={"april"}>Abril</MenuItem>
                    <MenuItem value={"may"}>Maio</MenuItem>
                    <MenuItem value={"june"}>Junho</MenuItem>
                    <MenuItem value={"july"}>Julho</MenuItem>
                    <MenuItem value={"august"}>Agosto</MenuItem>
                    <MenuItem value={"september"}>Setembro</MenuItem>
                    <MenuItem value={"october"}>Outubro</MenuItem>
                    <MenuItem value={"november"}>Novembro</MenuItem>
                    <MenuItem value={"december"}>Dezembro</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="ano-referencia">Ano</InputLabel>
                  <Select
                    labelId="ano-referencia"
                    id="ano-referencia"
                    label="Ano"
                    value={anoReferencia}
                    onChange={(e) => setAnoReferencia(e.target.value)}
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
            </Typography>

            <CustomPopoverDash>
            <Stack
                p={2}
                paddingLeft={8}
                paddingRight={8}
                className={classes.popoupOption}
                onClick={() => setMetrica("renda")}
                textAlign="center"
              >
                Renda
              </Stack>
              <hr className={classes.linha}></hr>
              <Stack
                p={2}
                paddingTop={1}
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
                paddingLeft={8}
                paddingRight={8}
                className={classes.popoupOption}
                onClick={() => setMetrica("histórico")}
              >
                Histórico
              </Stack>
            </CustomPopoverDash>
          </Container>
        </Container>

        {metrica === "renda" ? (
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
                        textoKpi="Sessões Previstas"
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
                  <CardBarChart
                    tituloPieChart={"Formas de pagamento mais utilizadas"}
                    width="100%"
                    data={dataFormasPagamentos}>
                  </CardBarChart>
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
                  <CardSankeyChart tituloPieChart="Conversão de sessões" data={dataFluxoConversaoSessoes} width={"100%"}>

                  </CardSankeyChart>
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
                  <CardDoubleBarChart
                    tituloPieChart="Valor médio gerado por tema"
                    data={dataBar}
                    width="100%"
                  ></CardDoubleBarChart>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : null}

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
                        textoKpi="Sessões Previstas"
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
                    tituloPieChart="Clientes que agendaram sessões com 1 semana utilizando o sistema"
                    width="100%"
                    data={dataClienteSemana}
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
                  <CardTreeMapChart tituloPieChart={"Temas em destaque"} data={dataTreeMap} width={"100%"}>
                  </CardTreeMapChart>
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
                  <CardDoubleBarChart
                    tituloPieChart="Estados com mais sessões"
                    data={dataBar}
                    width="100%"
                  ></CardDoubleBarChart>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
          {metrica === "histórico" ? (
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
                  <CardStackedBarChart
                    tituloPieChart="Base de usuários cadastrados"
                    width="100%"
                    data={dataClientesFotografos}
                  ></CardStackedBarChart>
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
                  <CardBarLineChart
                    tituloPieChart="Progressão de novos usuários cadastrados"
                    data={dataProgressaoUsuarios}
                    width="100%"
                  ></CardBarLineChart>
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
                  <CardStackedBarChart
                    tituloPieChart="Contatos convertidos em sessões"
                    width="100%"
                    data={dataContatosConvertidos}
                  ></CardStackedBarChart>
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
                  <CardBarLineChart
                    tituloPieChart="Progressão sessões de fotos realizadas"
                    data={dataProgressaoSessoes}
                    width="100%"
                  ></CardBarLineChart>
                </Grid>
              </Grid>
            </Box>
            ) : null}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default DashAdmin;
