import { Popover, Stack, Typography } from "@mui/material"
import { useUserContext } from "contexts"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import arrow from "assets/icons/popover-arrow.svg"
import LogoutIcon from '@mui/icons-material/Logout';

const CustomPopover = ({...props}) => {
  const { name } = useUserContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = !!anchorEl
  const navigate = useNavigate()

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
      <Stack height="100%" aria-describedby={isOpen ? "menu" : undefined} aria-haspopup="true" direction="row" alignItems="center" sx={{cursor: "pointer"}} onClick={handleClick}>
        <Typography mr={1}>{name}</Typography>
        <img src={arrow} alt="arrow-icon"/>
      </Stack>
      <Popover 
      id="menu"
      open={isOpen}
      anchorReference='anchorEl'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handleClose}
      className={ classes.popover }
      >
        <Stack onClick={() => handleNavigation("/")} direction="row" alignItems="center" sx={{cursor: "pointer"}} p={2}>
          <LogoutIcon></LogoutIcon>
          <Typography paddingLeft={1}>Logoff</Typography>
        </Stack>
      </Popover>
    </>
  )
}

export default CustomPopover