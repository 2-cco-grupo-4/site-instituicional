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
import CardBarLineChart from "atoms/CardBarLineChart/CardBarLineChart"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from "react"
import CustomPopover from "molecules/CustomPopover"
import CustomPopoverDash from "atoms/CustomPopoverDash"
import { ADMIN } from "service/dashboard"
import axios from "axios"
import { Await } from "react-router-dom"
import { CLIENTE } from "service/user"

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

    const [dataProgressaoUsuarios, setDataProgressaoUsuarios] = useState([{}])

    const [dataProgressaoSessoes, setDataProgressaoSessoes] = useState([{}])

    const [dataKpi1, setDataKpi1] = useState([{}])

    const [dataKpi2, setDataKpi2] = useState([{}])

    const [dataKpi3, setDataKpi3] = useState([{}])

    const [valorKpi1, setValorKpi1] = useState(0)

    const [valorKpi2, setValorKpi2] = useState(0)

    const [valorKpi3, setValorKpi3] = useState(0)

    const [porcentagemKpi1, setPorcentagemKpi1] = useState(0)

    const [porcentagemKpi2, setPorcentagemKpi2] = useState(0)
    
    const [porcentagemKpi3, setPorcentagemKpi3] = useState(0)

    const [token, setToken] = useState({})

    const [conexao, setConexao] = useState()


    const classes = useStyles()

//   getViewBarChartTemaContato
//             .then(function(response){
//                 console.log(response)
//             });

        
        useEffect(() => {
            axios.create({
                baseURL: "http://localhost:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*'
                    // 'Authorization': `Bearer ${token.token}`

                    
                  },
            });

            // axios.defaults.headers.common['Content-Type'] = 'application/json';
            // axios.defaults.headers.common['Content-Type'] = 'application/json';

        })

        const login = {
            "email": "admin@email.com",
            "senha": "picme1234"
        }

        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
              }
        }


        useEffect(() => {
            
            CLIENTE.ENTRAR(login).then(function(response){
                setToken(response.data)
                console.log('TESTE: ' + token.token)    
            })
            
            axios.get('http://localhost:8080/admin/contagem-tema-contato', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataBar(response.data)
            })

            axios.get('http://localhost:8080/admin/contagem-clientes-semana', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataClienteSemana(response.data)
            })

            axios.get('http://localhost:8080/admin/faixa-etaria-clientes', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataBarFaixaEtaria(response.data)
            })

            axios.get('http://localhost:8080/admin/faixa-etaria-clientes-tema/Casamentos', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataBarFaixaEtariaTema(response.data)
            })

            axios.get('http://localhost:8080/admin/total-clientes-fotografos', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataClientesFotografos(response.data)
            })

            axios.get('http://localhost:8080/admin/sessoes-finalizadas-canceladas', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataContatosConvertidos(response.data)
            })

            axios.get('http://localhost:8080/admin/progressao-usuarios-mes', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataProgressaoUsuarios(response.data)
            })

            axios.get('http://localhost:8080/admin/progressao-relizacao-sessoes', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
                setDataProgressaoSessoes(response.data)
            })
            
            axios.get('http://localhost:8080/admin/kpi-total-usuarios', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
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

            axios.get('http://localhost:8080/admin/kpi-sessoes-realizadas', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
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

            axios.get('http://localhost:8080/admin/kpi-total-acessos', {headers: {
                'Authorization': `Bearer ${token.token}`
              },}).then(function(response){
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

  return (

    

    <Stack sx={{ transition: '2s all ease' }}>
        <Header type={2} />
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
                            <Stack p={2} paddingBottom={1} paddingLeft={8} paddingRight={8} className={ classes.popoupOption } onClick={() => setMetrica("marketing")}>Marketing</Stack>
                            <hr className={ classes.linha }></hr>
                            <Stack p={2} paddingTop={1} paddingLeft={8} paddingRight={8} className={ classes.popoupOption } onClick={() => setMetrica("usuários")}>Usuários</Stack>
                        </CustomPopoverDash>
                
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
                    textoKpi="Usuários"
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

                            <CardBarLineChart
                                tituloPieChart="Progressão de novos usuários cadastrados"
                                data={dataProgressaoUsuarios}
                                width="55%"
                            >

                            </CardBarLineChart>

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

                            <CardBarLineChart
                                tituloPieChart="Progressão sessões de fotos realizadas"
                                data={dataProgressaoSessoes}
                                width="55%"
                            >

                            </CardBarLineChart>

                        </Container>
                    </>
                    
                )
             }
            
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin