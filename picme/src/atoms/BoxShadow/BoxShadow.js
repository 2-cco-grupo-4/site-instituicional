import useStyles from "./BoxShadow.styles"

import { Box } from "@mui/material"

const BoxShadow = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Box className={classes.caixa}
        display="flex"
        alignItems="center"
        flexDirection="column"
        {...props}
    >
        { children }
    </Box>
  )
}

export default BoxShadow