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
import CardChartPie from "atoms/CardChartPie/CardChartPie"
import CardBarChart from "atoms/CardBarChart/CardBarChart"



const DashAdmin = () => {

    const dataBar = [
        {
          name: 'Casamento',
          Contatos: 2400
        },
        {
          name: 'Aniversário',
          Contatos: 1398
        },
        {
          name: 'Debutante',
          Contatos: 9800
        },
        {
          name: 'Encontros',
          Contatos: 3908
        },
        {
          name: 'Esportivo',
          Contatos: 4800
        },
        {
          name: 'Família',
          Contatos: 3800
        }
      ];

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
                fontSize="16px"
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
            <Container
                py={6}
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="0"
                paddingRight="0"
            >
                <CardChartPie 
                    tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                    label01="Fecharam"
                    label02="Não Fecharam"
                    value01={20}
                    value02={80}
                >

                </CardChartPie>

                <CardBarChart
                    tituloPieChart="Temas com mais ‘contatos’ iniciados"
                    data={dataBar}
                >
                    
                </CardBarChart>
            </Container>
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin