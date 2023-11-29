import React from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,  // Adicionado
} from "@mui/material";
import { useTheme } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const ContratoEditar = ({ open, setOpen }) => {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Adicione a lógica para salvar o contrato aqui
    // ...

    // Feche o modal após salvar
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 5,
            minWidth: 800,
            borderRadius: 8,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" borderBottom="1px solid #333" pb={2}>
            <Typography variant="h4" gutterBottom>
              Editar Contrato
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Grid container spacing={2} mt={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Data:</strong>
              </Typography>
              <TextField label="Data" fullWidth /> {/* Adicionado */}
            </Grid>
          </Grid>

          {/* Seção de Informações de Pagamento */}
          <Grid container spacing={2} mt={4} borderBottom="1px solid #333" pb={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Informações de pagamento:</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Forma de pagamento:</Typography>
                  <TextField label="Forma de pagamento" fullWidth /> {/* Adicionado */}
                </Grid>
                <Grid item xs={3}>
                  <Typography>Valor:</Typography>
                  <TextField label="Valor" fullWidth /> {/* Adicionado */}
                </Grid>
                <Grid item xs={3}>
                  <Typography>Parcelas:</Typography>
                  <TextField label="Parcelas" fullWidth /> {/* Adicionado */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Seção de Endereço */}
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Endereço:</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Estado:</Typography>
                  <TextField label="Estado" fullWidth /> {/* Adicionado */}
                  <Typography>Cidade:</Typography>
                  <TextField label="Cidade" fullWidth /> {/* Adicionado */}
                  <Typography>Bairro:</Typography>
                  <TextField label="Bairro" fullWidth /> {/* Adicionado */}
                </Grid>
                <Grid item xs={6}>
                  <Typography>CEP:</Typography>
                  <TextField label="CEP" fullWidth /> {/* Adicionado */}
                  <Typography>Rua:</Typography>
                  <TextField label="Rua" fullWidth /> {/* Adicionado */}
                  <Typography>Número:</Typography>
                  <TextField label="Número" fullWidth /> {/* Adicionado */}
                  <Typography>Complemento:</Typography>
                  <TextField label="Complemento" fullWidth /> {/* Adicionado */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Botões de Ação */}
          <Stack direction="row" justifyContent="space-between" mt={4}>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="outlined" color="primary">
              Negociar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Aceitar
            </Button>
          </Stack>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default ContratoEditar;
