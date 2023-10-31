import {
  Stack,
  Typography,
  Drawer,
  Box,
  Divider,
  Grid,
  Input,
} from "@mui/material";
import useStyles from "./ArquivosAdmin.style.js";
import Header from "molecules/Header";
import LogoPicme from "atoms/LogoPicme";
import BarChartIcon from "@mui/icons-material/BarChart";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import CardStackedBarChart from "atoms/CardStackedBarChart";
import { ROUTES } from "utils/constants";
import { useUserContext } from "contexts";
import { Await, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Container from "atoms/Container";
import CustomButton from "atoms/CustomButton/CustomButton.js";
import { ARQUIVOS_ADMIN } from "service/arquivos.js";

const ArquivosAdmin = () => {
  const classes = useStyles();

  const { token, id, nome } = useUserContext();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile === "vazio") return;
    if (selectedFile) {
      ARQUIVOS_ADMIN.IMPORTAR_TXT_TEMAS_TAGS(token, selectedFile)
        .then(() => {
          fileInputRef.current.value = null;
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error("Erro ao fazer upload do arquivo:", error);
        });
    } else {
      console.error("Erro ao fazer upload do arquivo: arquivo vazio");
    }
  }, [selectedFile]);

  const exportarCsv = () => {
    ARQUIVOS_ADMIN.EXPORTAR_TXT_PREFERENCIAS_TEMAS(token)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "listaPreferenciasTemas_%.txt".replace(
            "%",
            new Date().toLocaleString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          )
        );
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Stack>
      <Box>
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
            <LogoPicme dash={true} height={70} />
          </Box>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              p={1}
              mb={5}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.DASH_ADMIN)}
            >
              <BarChartIcon
                fontSize="large"
                style={{ color: "#ffffff", fontSize: 40 }}
              />
            </Box>
            <Box
              p={1}
              mb={5}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={() => navigate(ROUTES.ARQUIVOS_ADMIN)}
            >
              <ContentPasteGoIcon
                fontSize="large"
                style={{ color: "#1E1E1E", fontSize: 40 }}
              />
            </Box>
            <Box p={1} mb={5} sx={{ cursor: "pointer" }}>
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
              <Typography fontSize="14px" sx={{ color: "#ffffff" }}>
                {nome}
              </Typography>
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
                  style={{ color: "#ffffff", fontSize: 35, paddingTop: "10px" }}
                />
                <Typography fontSize="14px" sx={{ color: "#ffffff" }}>
                  Sair
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
      <Box>
        <Container>
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
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              sx={{
                paddingLeft: "0 !important",
              }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                Exportação ou Importação de Arquivos
              </Typography>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "colums",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <Typography sx={{ fontSize: "18px" }}>
                  Exportação de Arquivo TXT com preferências dos usuários sobre
                  temas
                </Typography>

                {/* <input type="file" id="fileInput" style="display: none"></input> */}

                <CustomButton
                  sx={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#1E1E1E",
                    color: "#ffffff",
                    borderRadius: 5,
                    marginTop: "20px",
                  }}
                  onClick={() => exportarCsv()}
                >
                  Exportar
                </CustomButton>
              </Grid>
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <Typography sx={{ fontSize: "18px" }}>
                  Importar Arquivo TXT com lista de temas e tags externa
                </Typography>
                <label htmlFor="file-input">
                  <input
                    id="file-input"
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    hidden
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
                    Selecione um arquivo
                  </CustomButton>
                </label>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Stack>
  );
};

export default ArquivosAdmin;
