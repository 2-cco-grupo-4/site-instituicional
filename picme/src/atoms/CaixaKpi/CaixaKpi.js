import useStyles from "./CaixaKpi.styles"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Container from "atoms/Container"


import {
    Box,
    Typography,
    Stack
  } from "@mui/material"
import BoxShadow from "atoms/BoxShadow/BoxShadow"

const CaixaKpi = ({valorKpi, textoKpi}) => {
  const classes = useStyles()

  return (
    <BoxShadow
        width="25%"
        height="auto"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
    >
        <Typography
            fontSize="16px"
            color="black"
            fontFamily="Inter"
            >
            <Box fontWeight="bold" component="span">{valorKpi}</Box> {textoKpi}
        </Typography>

        <Container
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width="auto"
            height="auto"
            padding={0}
        >

            <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 0 }}>
                <ArrowDropUpIcon fontSize="large" style={{ color: "green"}}></ArrowDropUpIcon>
                <Typography
                    fontSize="14px"
                    marginLeft={-1}
                    >
                    8%
                </Typography>
            </Stack>
            
        </Container>
        
    </BoxShadow>
  )
}

export default CaixaKpi