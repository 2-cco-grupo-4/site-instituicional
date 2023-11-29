import { Popover, Stack, Typography } from "@mui/material"
import { useUserContext } from "contexts"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useStyles from "./CustomPopover.styles"

import arrow from "assets/icons/popover-arrow.svg"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import LogoutIcon from "@mui/icons-material/Logout"
import ChatIcon from "@mui/icons-material/Chat"
import { ROUTES } from "utils/constants"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ModalAlterarImagem from "pages/ModalEditarImagemPerfil/ModalEditarImagemPerfil"

const CustomPopover = ({ ...props }) => {
  const classes = useStyles()
  const { nome, setAutenticado, tipoUsuario } = useUserContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = !!anchorEl
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleNavigation = (route) => {
    navigate(route)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
            handleNavigation(ROUTES.CHAT)
          }}
          direction="row"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          p={2}
        >
          <ChatIcon />
          <Typography paddingLeft={1}>Chat</Typography>
        </Stack>
        {/* <Stack
          onClick={() => {
            setOpenModal(true);
          }}
          direction="row"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          p={2}
        >
          <AccountCircleIcon />
          <Typography paddingLeft={1}>Alterar Imagem</Typography>
        </Stack>
        <ModalAlterarImagem open={openModal} setOpen={setOpenModal} /> */}
        {tipoUsuario == 2 && (
          <>
            <Stack
              onClick={() => {
                navigate(ROUTES.NOVO_ALBUM)
              }}
              direction="row"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              p={2}
            >
              <AddAPhotoIcon></AddAPhotoIcon>
              <Typography paddingLeft={1}>Novo Álbum</Typography>
            </Stack>
            <Stack
              onClick={() => {
                navigate(ROUTES.CALENDARIO)
              }}
              direction="row"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              p={2}
            >
              <CalendarMonthIcon></CalendarMonthIcon>
              <Typography paddingLeft={1}>Calendário</Typography>
            </Stack>
            <Stack
              onClick={() => {
                navigate(ROUTES.DASH_FOTOGRAFO)
              }}
              direction="row"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              p={2}
            >
              <LeaderboardIcon></LeaderboardIcon>
              <Typography paddingLeft={1}>Dashboard</Typography>
            </Stack>
          </>
        )}
        <Stack
          onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("nome")
            handleNavigation("/")
            setAutenticado(false)
          }}
          direction="row"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          p={2}
        >
          <LogoutIcon></LogoutIcon>
          <Typography paddingLeft={1}>Logoff</Typography>
        </Stack>
      </Popover>
    </>
  )
}

export default CustomPopover
