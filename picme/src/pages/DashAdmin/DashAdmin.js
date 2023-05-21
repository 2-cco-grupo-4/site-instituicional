// import { Container } from "@mui/material"
import useStyles from "./DashAdmin.styles"
import Header from 'molecules/Header'

import {
    Box,
    ImageList,
    ImageListItem,
    Stack,
    Typography
  } from "@mui/material"
import Container from "atoms/Container"
import CaixaKpi from "atoms/CaixaKpi/CaixaKpi"



const DashAdmin = () => {
  const classes = useStyles()

  return (
    <Stack sx={{ transition: '2s all ease' }}>
        <Header />
        <Container
            alignItems="center"
            flexDirection="column"
            py={6}
        > 
            <Typography
                fontSize="24px"
                color="black"
                fontFamily="Inter"
            >
                Você está acessando as métricas de <Box display="inline" fontWeight="bold">marketing</Box>
            </Typography>
            <Container
                py={6}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="0"
                paddingRight="0"
            >
                <CaixaKpi
                    py={6}
                    valorKpi="1345"
                    textoKpi="Clientes"
                >
                </CaixaKpi>

                <CaixaKpi
                    py={6}
                    valorKpi="230"
                    textoKpi="Sessões Realizadas"
                >
                </CaixaKpi>

                <CaixaKpi
                    py={6}
                    valorKpi="450"
                    textoKpi="Acessos"
                >
                </CaixaKpi>

            </Container>
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin