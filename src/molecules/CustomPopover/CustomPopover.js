import { Popover, Stack, Typography } from "@mui/material"
import { useUserContext } from "contexts"
import { useState } from "react"

import arrow from "assets/icons/popover-arrow.svg"

const CustomPopover = ({...props}) => {
  const { name } = useUserContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = !!anchorEl

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
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
      >
        <Stack p={2}>
          Teste do Popover
        </Stack>
      </Popover>
    </>
  )
}

export default CustomPopover