import useStyles from "./CaixaKpi.styles"

import {
    Box,
    ImageList,
    ImageListItem,
    Stack,
    Typography
  } from "@mui/material"
import Container from "atoms/Container"

const CaixaKpi = ({valorKpi, textoKpi}) => {
  const classes = useStyles()

  return (
    <Box className={classes.caixa}
        display="flex"
        alignItems="center"
        flexDirection="column"
    >
        <Typography
            fontSize="16px"
            color="black"
            fontFamily="Inter"
            >
            <Box fontWeight="bold" component="span">{valorKpi}</Box> {textoKpi}
        </Typography>
        
    </Box>
  )
}

export default CaixaKpi