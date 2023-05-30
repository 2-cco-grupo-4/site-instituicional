import { Popover, Stack, Typography } from "@mui/material"
import { useUserContext } from "contexts"
import { useState } from "react"

import arrow from "assets/icons/popover-arrow.svg"

import useStyles from "./CustomPopover.styles"

const CustomPopover = ({...props}) => {
  const classes = useStyles()
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
        <img src={arrow} />
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
        <Stack p={2}>
          Teste do Popover
        </Stack>
      </Popover>
    </>
  )
}

export default CustomPopover