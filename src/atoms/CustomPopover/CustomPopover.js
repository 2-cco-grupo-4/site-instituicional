import { Popover, Stack, Typography } from "@mui/material"
import { useUserContext } from "contexts"
import { useState } from "react"

import arrow from "assets/icons/popover-arrow.svg"

import useStyles from "./CustomPopover.styles"

const CustomPopover = () => {
  const classes = useStyles()
  const { userName } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Stack position="relative">
      <Stack direction="row" alignItems="center" sx={{cursor: "pointer"}} onClick={() => handleClick()}>
        <Typography mr={1}>{userName}</Typography>
        <img src={arrow} />
      </Stack>
      <Popover 
      open={isOpen}
      anchorEl={<Stack/>}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      >
        <Stack>
          oi
        </Stack>
      </Popover>
    </Stack>
  )
}

export default CustomPopover