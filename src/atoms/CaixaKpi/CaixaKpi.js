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
import { style } from "@mui/system";

const CaixaKpi = ({valorKpi, textoKpi, porcentagem}) => {
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

            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ flexWrap: 'wrap', gap: 0 }}>
                {porcentagem >= 0 ?  <ArrowDropUpIcon className={classes.positive}></ArrowDropUpIcon> : <ArrowDropDownIcon className={classes.negative}></ArrowDropDownIcon>}
                
                <Typography
                    fontSize="14px"
                    marginLeft={-1}
                    >
                    {porcentagem}%
                </Typography>
            </Stack>
            
        </Container>
        
    </BoxShadow>
  )
}

export default CaixaKpi