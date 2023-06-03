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

    const [dataContatosConvertidos, setDataContatosConvertidos] = useState([{}])

    const [dataKpi1, setDataKpi1] = useState([{}])

    const [dataKpi2, setDataKpi2] = useState([{}])

    const [dataKpi3, setDataKpi3] = useState([{}])

    const [valorKpi1, setValorKpi1] = useState(0)

    const [valorKpi2, setValorKpi2] = useState(0)

    const [valorKpi3, setValorKpi3] = useState(0)

    const [porcentagemKpi1, setPorcentagemKpi1] = useState(0)

    const [porcentagemKpi2, setPorcentagemKpi2] = useState(0)
    
    const [porcentagemKpi3, setPorcentagemKpi3] = useState(0)


    const classes = useStyles()

//   getViewBarChartTemaContato
//             .then(function(response){
//                 console.log(response)
//             });

        

        useEffect(() => {

            axios.create({
                baseURL: "http://localhost:8080"
            });
            
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

            axios.get('http://localhost:8080/admin/sessoes-finalizadas-canceladas').then(function(response){
                setDataContatosConvertidos(response.data)
            })
            
            axios.get('http://localhost:8080/admin/kpi-total-usuarios').then(function(response){
                setDataKpi1(response.data)
                var lista = (response.data)
                if(lista[2].quantidade == 0){
                    setPorcentagemKpi1(lista[1].quantidade * 100)
                }else if(lista[1].quantidade == 0){
                    setPorcentagemKpi1(lista[2].quantidade * -100)
                }else{
                    setPorcentagemKpi1((lista[1].quantidade * 100) / lista[2].quantidade - 100)
                }
                setValorKpi1(lista[0].quantidade)
            })

            axios.get('http://localhost:8080/admin/kpi-sessoes-realizadas').then(function(response){
                setDataKpi2(response.data)
                var lista = (response.data)
                if(lista[2].quantidade == 0){
                    setPorcentagemKpi2(lista[1].quantidade * 100)
                }else if(lista[1].quantidade == 0){
                    setPorcentagemKpi2(lista[2].quantidade * -100)
                }else{
                    setPorcentagemKpi2((lista[1].quantidade * 100) / lista[2].quantidade - 100)
                }
                setValorKpi2(lista[0].quantidade)
            })

            axios.get('http://localhost:8080/admin/kpi-total-acessos').then(function(response){
                setDataKpi3(response.data)
                var lista = (response.data)
                if(lista[2].quantidade == 0){
                    setPorcentagemKpi3(lista[1].quantidade * 100)
                }else if(lista[1].quantidade == 0){
                    setPorcentagemKpi3(lista[2].quantidade * -100)
                }else{
                    setPorcentagemKpi3((lista[1].quantidade * 100) / lista[2].quantidade - 100)
                }
                setValorKpi3(lista[0].quantidade)
            })


        }, [metrica])


        const jsonBar = [
            {
                casa: "teste",
                value: 40
            },
            {
                casa: "teste2",
                value: 60
            },
            {
                casa: "teste3",
                value: 80
            },
            {
                casa: "teste4",
                value: 45
            },
            {
                casa: "teste5",
                value: 120
            },
            {
                casa: "teste6",
                value: 10
            },
            {
                casa: "teste7",
                value: 20
            }
        ];

      


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
                            <Stack p={2} paddingBottom={1} className={ classes.popoupOption } onClick={() => setMetrica("marketing")}>Marketing</Stack>
                            <hr className={ classes.linha }></hr>
                            <Stack p={2} paddingTop={1} className={ classes.popoupOption } onClick={() => setMetrica("usuários")}>Usuários</Stack>
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
                    valorKpi={valorKpi1}
                    textoKpi="Clientes"
                    porcentagem={porcentagemKpi1}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi={valorKpi2}
                    textoKpi="Sessões Realizadas"
                    porcentagem={porcentagemKpi2}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi={valorKpi3}
                    textoKpi="Acessos"
                    porcentagem={porcentagemKpi3}
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
                                tituloPieChart="Base de usuários cadastrados"
                                data={dataClientesFotografos}
                                width="40%"
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão de novos usuários cadastrados"
                                data={jsonBar}
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
                                width="40%"
                                data={dataContatosConvertidos}
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão sessões de fotos realizadas"
                                data={jsonBar}
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