import useStyles from "./InstaRedirect.styles";
import Header from "molecules/Header";
import { INSTAGRAM } from "service/instagram";
import { ROUTES } from "utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

const InstaRedirect = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  const ChamadaApi = async () => {
    console.log("Código: " + code);

    await INSTAGRAM.CODE_TO_TOKEN(code)
      .then(async (response) => {
        if (response.status(200)) {
          navigate(ROUTES.FEED);
        } else {
          alert(response.status);
        }
      })
      .catch((error) => {
        console.error("Erro na chamada da API:", error);
      });

    console.log(code);

    // return alert(code);
  };

  ChamadaApi();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress size={120} />
    </Box>
  );
};

export default InstaRedirect;
