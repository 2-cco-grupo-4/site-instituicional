import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from 'molecules/Header'
import useStyles from "./Pedido.styles"
import { Box, Stack, TextField, Typography, useTheme, Button, InputLabel, MenuItem, FormControl, Select, FormGroup, Grid } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Container from 'atoms/Container/Container';

function createData(foto, nomeFotografo, status, evento, dataSolicitacao, detalhes) {
  return { foto, nomeFotografo, status, evento, dataSolicitacao, detalhes };
}

function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{paddingTop: 0, width:'100%'}} components={['DatePicker']}>
        <DatePicker label="Data" sx={{width: '100%'}}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}

function RepeatedButton({ label, onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
}

function BasicSelect() {
  const [theme, setTema] = React.useState('');

  const handleChangeTheme = (event) => {
    setTema(event.target.value);
  };

  const [status, setStatus] = React.useState('');
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [dataSolicitacao, setDataSolicitacao] = React.useState('');
  const handleChangeDataSolicitacao = (event) => {
    setDataSolicitacao(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormGroup>
        <Grid container width="100%" columnSpacing={1}>
          <Grid item md={4} sm={4}>
            <FormControl fullWidth>
            <InputLabel sx={{display:'flex'}} id="demo-simple-select-label">Tema</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theme}
              label="Theme"
              onChange={handleChangeTheme}
            >
              <MenuItem value={theme}>Aniversário</MenuItem>
              <MenuItem value={theme}>Casamento</MenuItem>
              <MenuItem value={theme}>Chá de Bebê</MenuItem>
              <MenuItem value={theme}>Debutante</MenuItem>
              <MenuItem value={theme}>Formatura</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChangeStatus}
            >
              <MenuItem value={status}>Agendado</MenuItem>
              <MenuItem value={status}>Cancelado</MenuItem>
              <MenuItem value={status}>Concluído</MenuItem>
              <MenuItem value={status}>Em espera</MenuItem>
              <MenuItem value={status}>Negociando</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} sx={{paddinTop: 0}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <BasicDatePicker
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dataSolicitacao}
                onChange={handleChangeDataSolicitacao}
              />

          </FormControl>
          </Grid>
        </Grid>
      </FormGroup>

    </Box>
  );
}


const rows = [
  createData('Foto', 'Teste Nome', 'Em espera', 'Casamento', '21/04/2023', 'Ver Detalhes', 'Teste'),
  createData('Foto', 'Teste Nome', 'Negociando', 'Aniversário', '14/04/2023', 'Ver Detalhes'),
  createData('Foto', 'Teste Nome', 'Agendado', 'Formatura', '26/02/2023', 'Ver Detalhes'),
  createData('Foto', 'Teste Nome', 'Concluído', 'Debutante', '06/11/2022', 'Ver Detalhes'),
  createData('Foto', 'Teste Nome', 'Concluído', 'Chá de Bebê', '12/10/2022', 'Ver Detalhes'),
];



const head = () => {

  return (
    <Stack sx={{ transition: '2s all ease' }}>

      <Header type={1} />
      <Container
        alignItems="center"

      >
      </Container>
    </Stack>
  )
}


export default function BasicTable() {
  const classes = useStyles()
  return (
    <>
      <Header type={2} />
    <Container sx={{ transition: '2s all ease', width: '100%' }}>
      <Box width="100%" sx={{marginTop: '50px', p: 2}}>
        <Typography variant="subtitle-small-semibold" sx={{marginBottom: '50px', fontSize: '25px' }}>
          Pedidos
        </Typography>
        <Typography sx={{ marginTop: '25px', marginBottom: '25px', fontSize: '18px' }}>
          Filtrar:
        </Typography>
        <BasicSelect />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="center">Nome do Fotógrafo</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Evento</TableCell>
                <TableCell align="center">Data de Solicitação</TableCell>
                <TableCell align="center">Detalhes</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.foto}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row" >
                    {row.foto}
                  </TableCell>
                  <TableCell align="center">{row.nomeFotografo}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.evento}</TableCell>
                  <TableCell align="center">{row.dataSolicitacao}</TableCell>
                  <TableCell align="center"><Button onClick={RepeatedButton}>Ver Detalhes</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
    </>
  );
}