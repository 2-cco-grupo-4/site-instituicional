import React from "react"
import { useEffect, useState } from "react"
import { useUserContext } from "contexts"
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField, // Adicionado
} from "@mui/material"
import { useTheme } from "@mui/system"
import CloseIcon from "@mui/icons-material/Close"
import { CONTRATO } from "service/contrato"

const ContratoEditar = ({ open, setOpen, id_sessao }) => {
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
  }

  const { id, nome, token } = useUserContext()

  const handleSave = () => {
    // Adicione a lógica para salvar o contrato aqui
    // ...

    // Feche o modal após salvar
    setOpen(false)
  }

  const [messageData, setMessageData] = useState([{}])

  const pagamentoCopia = { ...messageData.pagamento }

  const enderecoCopia = { ...messageData.endereco }

  useEffect(() => {
    const fetchContrato = async () => {
      const contrato = await CONTRATO.EXIBIR_CONTRATO(51, token)
      console.log(contrato.data)
      setMessageData(contrato.data)
      console.log(messageData)
    }

    fetchContrato()
  }, [])

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
            minWidth: 300,
            minHeight: 300,
            maxHeight: "80vh",
            maxWidth: "80vw",
            borderRadius: 8,
            overflowY: "auto",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #333"
            pb={2}
          >
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
              <TextField
                value={messageData.dataRealizacao}
                label="Data"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>

          {/* Seção de Informações de Pagamento */}
          <Grid
            container
            spacing={2}
            mt={4}
            borderBottom="1px solid #333"
            pb={2}
          >
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Informações de pagamento:</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    value={pagamentoCopia.forma}
                    label="Forma de pagamento"
                    fullWidth
                    disabled
                  />{" "}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={pagamentoCopia.valor}
                    label="Valor"
                    fullWidth
                    disabled
                  />{" "}
                  {/* Adicionado */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={pagamentoCopia.parcelas}
                    label="Parcelas"
                    fullWidth
                    disabled
                  />{" "}
                  {/* Adicionado */}
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
                  <TextField
                    value={enderecoCopia.estado}
                    label="Estado"
                    fullWidth
                    disabled
                    mb={2} // Adicionado espaçamento
                  />
                  <TextField
                    value={enderecoCopia.cidade}
                    label="Cidade"
                    fullWidth
                    disabled
                    mb={2} // Adicionado espaçamento
                  />
                  <TextField
                    value={enderecoCopia.bairro}
                    label="Bairro"
                    fullWidth
                    disabled
                    mb={2} // Adicionado espaçamento
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={enderecoCopia.cep}
                    label="CEP"
                    fullWidth
                    disabled
                    mb={2} // Adicionado espaçamento
                  />
                  <TextField
                    value={enderecoCopia.rua}
                    disabled
                    label="Rua"
                    fullWidth
                    mb={2} // Adicionado espaçamento
                  />
                  <TextField
                    value={enderecoCopia.numero}
                    label="Número"
                    fullWidth
                    disabled
                    mb={2} // Adicionado espaçamento
                  />
                  <TextField
                    value={enderecoCopia.complemento}
                    label="Complemento"
                    fullWidth
                  />
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
  )
}

export default ContratoEditar
