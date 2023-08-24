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
import { Box, Stack, TextField, Typography, useTheme, Container, Button, InputLabel, MenuItem, FormControl, Select    } from "@mui/material"


function createData(foto, nomeFotografo, status, evento, dataSolicitacao, detalhes) {
  return { foto, nomeFotografo, status, evento, dataSolicitacao, detalhes };
}

function RepeatedButton({ label, onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
}

function BasicSelect() {
  const [tema, setTema] = React.useState('');

  const handleChange = (event) => {
    setTema(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tema</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tema}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={tema}>Tema</MenuItem>
          
        </Select>
      </FormControl>
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
  return (
    <Box>
      <Typography variant="subtitle-small-semibold" sx={{ marginBottom: '50px', fontSize: '25px' }}>
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
  );
}