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
import FilterAltIcon from '@mui/icons-material/FilterAlt';



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

      const dataBarFaixaEtaria = [
        {
            faixa: "18-20",
            quantidade: 300
        },
        {
            faixa: "21-25",
            quantidade: 1157
        },
        {
            faixa: "26-30",
            quantidade: 1056
        },
        {
            faixa: "31-35",
            quantidade: 278
        },
        {
            faixa: "36-40",
            quantidade: 140
        }
      ]

      const dataBarFaixaEtariaTema = [
        {
            faixa: "18-20",
            quantidade: 250
        },
        {
            faixa: "21-25",
            quantidade: 300
        },
        {
            faixa: "26-30",
            quantidade: 80
        },
        {
            faixa: "31-35",
            quantidade: 15
        },
        {
            faixa: "36-40",
            quantidade: 3
        }
      ]

  const classes = useStyles()

  return (
    <Stack sx={{ transition: '2s all ease' }}>
        <Header />
        <Container
            alignItems="center"
            flexDirection="column"
            py={6}
        >   
            <Container
                py={6}
                flexDirection="row"
                justifyContent="center"
                paddingLeft="0"
                paddingRight="0"
                width="100%"
            >
                <Typography
                fontSize="16px"
                color="black"
                fontFamily="Inter"
                alignSelf="center"
                justifySelf="center"
                >
                    Você está acessando as métricas de <Box display="inline" fontWeight="bold">marketing</Box>
                </Typography>
                
                    <FilterAltIcon marginLeft="auto" className={classes.iconFunil}></FilterAltIcon>
                
            </Container> 
            
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
                    width="40%"
                    value01={20}
                    value02={80}
                >

                </CardChartPie>

                <CardBarChart
                    tituloPieChart="Temas com mais ‘contatos’ iniciados"
                    data={dataBar}
                    width="55%"
                >
                    
                </CardBarChart>
            </Container>

            <Container
                py={3}
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="0"
                paddingRight="0"
            >

                <CardBarChart
                    tituloPieChart="Faixa etária dos clientes"
                    data={dataBarFaixaEtaria}
                    width="40%"
                />

                <CardBarChart
                    tituloPieChart="Faixa etária dos clientes por tema"
                    data={dataBarFaixaEtariaTema}
                    width="55%"
                />

            </Container>
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin