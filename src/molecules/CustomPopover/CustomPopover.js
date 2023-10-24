import { Popover, Stack, Typography } from "@mui/material";
import { useUserContext } from "contexts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useStyles from "./CustomPopover.styles";

import arrow from "assets/icons/popover-arrow.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { ROUTES } from "utils/constants";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const CustomPopover = ({ ...props }) => {
  const classes = useStyles();
  const { nome, setAutenticado, tipoUsuario } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = !!anchorEl;
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        height="100%"
        aria-describedby={isOpen ? "menu" : undefined}
        aria-haspopup="true"
        direction="row"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Typography mr={1}>{nome}</Typography>
        <img src={arrow} alt="arrow-icon" />
      </Stack>
      <Popover
        id="menu"
        open={isOpen}
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
        className={classes.popover}
      >
        <Stack
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("nome");
            handleNavigation("/");
            setAutenticado(false);
          }}
          direction="row"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          p={2}
        >
          <LogoutIcon></LogoutIcon>
          <Typography paddingLeft={1}>Logoff</Typography>
        </Stack>
        {tipoUsuario == 2 && (
          <Stack
            onClick={() => {
              navigate(ROUTES.NOVO_ALBUM);
            }}
            direction="row"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            p={2}
          >
            <AddAPhotoIcon></AddAPhotoIcon>
            <Typography paddingLeft={1}>Novo Álbum</Typography>
          </Stack>
        )}
      </Popover>
    </>
  );
};

export default CustomPopover;
