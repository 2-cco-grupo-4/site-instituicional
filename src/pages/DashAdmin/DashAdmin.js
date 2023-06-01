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
import { useEffect, useState } from "react"
import CustomPopover from "molecules/CustomPopover"
import CustomPopoverDash from "atoms/CustomPopoverDash"
import { getViewBarChartTemaContato } from "service/DashAdminPoint"
import axios from "axios"
import { Await } from "react-router-dom"

const DashAdmin = () => {

    const defaultValues = {
        metrica: "marketing"
    }

    const [metrica, setMetrica] = useState(defaultValues.metrica)
    

    const [dataBar, setDataBar] = useState([{}])

    const [dataClienteSemana, setDataClienteSemana] = useState([{}])

    const [dataBarFaixaEtaria, setDataBarFaixaEtaria] = useState([{}])

    const [dataBarFaixaEtariaTema, setDataBarFaixaEtariaTema] = useState([{}])
    
    const [dataClientesFotografos, setDataClientesFotografos] = useState([{}])

  const classes = useStyles()

//   getViewBarChartTemaContato
//             .then(function(response){
//                 console.log(response)
//             });

        axios.create({
            baseURL: "http://localhost:8080"
        });

        useEffect(() => {
            
            axios.get('http://localhost:8080/admin/contagem-tema-contato').then(function(response){
                setDataBar(response.data)
            })

            axios.get('http://localhost:8080/admin/contagem-clientes-semana').then(function(response){
                setDataClienteSemana(response.data)
            })

            axios.get('http://localhost:8080/admin/faixa-etaria-clientes').then(function(response){
                setDataBarFaixaEtaria(response.data)
            })

            axios.get('http://localhost:8080/admin/faixa-etaria-clientes-tema/Casamentos').then(function(response){
                setDataBarFaixaEtariaTema(response.data)
            })

            axios.get('http://localhost:8080/admin/total-clientes-fotografos').then(function(response){
                setDataClientesFotografos(response.data)
            })

        }, [])

      


  return (

    

    <Stack sx={{ transition: '2s all ease' }}>
        <Header type={3} />
        <Container
            alignItems="center"
            flexDirection="column"
            py={4}
        >   
            <Container
                py={3}
                flexDirection="row"
                justifyContent="center"
                paddingLeft="0"
                paddingRight="0"
                width="100%"
            >
                <Container
                flexDirection="row"
                justifyContent="end"
                alignItems="center"
                paddingLeft="0"
                paddingRight="0"
                width="100%"
                >

                    <Typography
                    fontSize="16px"
                    color="black"
                    textAlign="center"
                    flex={1}
                    >
                        Você está acessando as métricas de <Box display="inline" fontWeight="bold">{metrica}</Box>
                    </Typography>

                    
                        <CustomPopoverDash>
                            <Stack p={2} className={ classes.popoupOption } onClick={() => setMetrica("marketing")}>Marketing</Stack>
                            <hr></hr>
                            <Stack p={2} className={ classes.popoupOption } onClick={() => setMetrica("usuários")}>Usuários</Stack>
                        </CustomPopoverDash>
                    
                    
                    {/* <FilterAltIcon onClick={ metrica === "marketing" ? () => setMetrica("usuários") : () => setMetrica("marketing") } marginLeft="auto" fontSize="40px" className={classes.iconFunil}></FilterAltIcon> */}
                
                </Container> 
                
            </Container> 
            
            <Container
                py={3}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="0"
                paddingRight="0"
            >
                <CaixaKpi
                    valorKpi="1345"
                    textoKpi="Clientes"
                    porcentagem={10}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi="230"
                    textoKpi="Sessões Realizadas"
                    porcentagem={-15}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi="450"
                    textoKpi="Acessos"
                    porcentagem={20}
                >
                </CaixaKpi>

            </Container>
            {metrica === "marketing" ? 
                (
                    <>
                    <Container
                    py={3}
                    flexDirection="row"
                    justifyContent="space-between"
                    paddingLeft="0"
                    paddingRight="0"
                    >
                        <CardChartPie 
                            tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                            data={dataClienteSemana}
                            width="40%"
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
                    </>
                ) : (

                    <>
                        <Container
                        py={3}
                        flexDirection="row"
                        justifyContent="space-between"
                        paddingLeft="0"
                        paddingRight="0"
                        >
                            
                            <CardChartPie 
                                tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                                data={dataClienteSemana}
                                width="40%"
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão de novos usuários cadastrados"
                                data={dataBarFaixaEtariaTema}
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
                            
                            <CardChartPie
                                tituloPieChart="Contatos convertidos em sessões"
                                label01="Fecharam"
                                label02="Não Fecharam"
                                width="40%"
                                value01={70}
                                value02={30}
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão sessões de fotos realizadas"
                                data={dataBarFaixaEtariaTema}
                                width="55%"
                            >

                            </CardBarChart>

                        </Container>
                    </>
                    
                )
             }
            
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin