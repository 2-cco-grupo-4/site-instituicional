import useStyles from "./InstaRedirect.styles";
import Header from "molecules/Header";
import { INSTAGRAM } from "service/instagram";
import { ROUTES } from "utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useUserContext } from "contexts";
import axios from "axios";
import { FOTOGRAFO } from "service/user";

const InstaRedirect = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  const { token, id, nome } = useUserContext();
  const [param, setParam] = useState();
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    setContextLoaded(true);
  }, [token, nome, id]);

  useEffect(() => {
    const ChamadaApi = async () => {
      FOTOGRAFO.ATUALIZAR_TOKEN_INSTAGRAM(id, code, token).then((response) => {
        navigate(ROUTES.FEED);
      });
    };
    if (contextLoaded) {
      ChamadaApi();
    }
  }, [contextLoaded]);

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
