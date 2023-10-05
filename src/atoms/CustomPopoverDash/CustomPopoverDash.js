import { Popover, Stack, Typography } from "@mui/material";
import { useUserContext } from "contexts";
import { useState } from "react";

import arrow from "assets/icons/popover-arrow.svg";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuIcon from "@mui/icons-material/Menu";

import useStyles from "./CustomPopoverDash.styles";

const CustomPopoverDash = ({ children, ...props }) => {
  const classes = useStyles();
  const { name } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = !!anchorEl;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
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
        <MenuIcon fontSize="40px" className={classes.iconFunil}></MenuIcon>
      </Stack>
      <Popover
        className={classes.popover}
        id="menu"
        open={isOpen}
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        {children}
      </Popover>
    </>
  );
};

export default CustomPopoverDash;
