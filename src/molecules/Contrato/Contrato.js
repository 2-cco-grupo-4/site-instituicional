import useStyles from "./Contrato.styles";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import CustomButton from "atoms/CustomButton";

export default function BasicModal({ open, setOpen }) {
  const classes = useStyles();

  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [contractStatus, setContractStatus] = useState("Evento");
  const [selectedOption, setSelectedOption] = useState("email");

  const [selectedTema, setSelectedTema] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horarioEvento, setHorarioEvento] = useState("");

  const [cep, setCep] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleOpen = () => {
    setStep(0);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleStatusClick = (status, value) => {
    setContractStatus(status);
    setProgressValue(value);
  };

  const handleNext = () => {
    if (step === 0) {
      handleStatusClick("Mensagem", 50.0);
      setStep(1);
    } else if (step === 1) {
      handleStatusClick("Confirmar", 100.0);
      setStep(2);
    } else if (step === 2) {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (step === 1) {
      handleStatusClick("Evento", 0.0);
      setStep(0);
    } else if (step === 2) {
      handleStatusClick("Mensagem", 50.0);
      setStep(1);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <Button
          sx={{ color: "black", textDecoration: "none", fontSize: 30 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
        <div className={classes.textContainer}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                width: "100%",
                width: 600,
                height: 6,
                borderRadius: 3,
                marginBottom: 10,
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%", maxWidth: 600 }}
            >
              <Stack direction="column" alignItems="center">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Evento" ? "primary" : "inherit"
                  }
                  onClick={() => handleStatusClick("Evento", 0.0)}
                >
                  Evento
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Evento" ? "primary" : "inherit"
                  }
                >
                  {step === 0}
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="center">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Mensagem" ? "primary" : "inherit"
                  }
                  onClick={() => handleStatusClick("Mensagem", 50.0)}
                >
                  Mensagem
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Mensagem" ? "primary" : "inherit"
                  }
                >
                  {step === 1}
                </Typography>
              </Stack>
              <Stack direction="column" alignItems="center">
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Confirmar" ? "primary" : "inherit"
                  }
                  onClick={() => handleStatusClick("Confirmar", 100.0)}
                >
                  Confirmar
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  color={
                    contractStatus === "Confirmar" ? "primary" : "inherit"
                  }
                >
                  {step === 2}
                </Typography>
              </Stack>
            </Stack>

            {step === 0 && (
              // Etapa 0 (Evento)
              <>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ width: "100%", maxWidth: 860, paddingY: 5 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    INFORMAÇÕES ESSENCIAIS
                  </Typography>
                  <Typography variant="body1">
                    Precisamos destas informações para determinar o tipo de
                    evento
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Select
                      label="Tema"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={selectedTema}
                      onChange={(e) => setSelectedTema(e.target.value)}
                    >
                      <MenuItem value="" disabled>
                        Tema
                      </MenuItem>
                      <MenuItem value="tema1">Tema 1</MenuItem>
                      <MenuItem value="tema2">Tema 2</MenuItem>
                    </Select>
                    <TextField
                      label="Data"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={dataEvento}
                      onChange={(e) => setDataEvento(e.target.value)}
                    />
                    <TextField
                      label="Horário"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={horarioEvento}
                      onChange={(e) => setHorarioEvento(e.target.value)}
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ width: "100%", maxWidth: 860 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    ENDEREÇO
                  </Typography>
                  <Typography variant="body1">
                    Insira o endereço do seu evento
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      label="CEP"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    <Select
                      label="Estado"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={selectedEstado}
                      onChange={(e) =>
                        setSelectedEstado(e.target.value)
                      }
                    >
                      <MenuItem value="" disabled>
                        Estado
                      </MenuItem>
                      <MenuItem label="Estado" value="estado1">
                        Estado 1
                      </MenuItem>
                      <MenuItem label="Estado" value="estado2">
                        Estado 2
                      </MenuItem>
                    </Select>
                    <TextField
                      label="Cidade"
                      variant="outlined"
                      sx={{ width: "30%" }}
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      label="Bairro"
                      variant="outlined"
                      sx={{ width: "23%" }}
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                    <TextField
                      label="Rua"
                      variant="outlined"
                      sx={{ width: "23%" }}
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                    />
                    <TextField
                      label="Nº"
                      variant="outlined"
                      sx={{ width: "23%" }}
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                    <TextField
                      label="Complemento"
                      variant="outlined"
                      sx={{ width: "23%" }}
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </Stack>

                </Stack>
              </>
            )}
            {step === 1 && (
              // Etapa 1 (Mensagem)
              <>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ width: "100%", maxWidth: 860, paddingY: 5 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    MENSAGEM
                  </Typography>
                  <Typography variant="body1">
                    Esta mensagem será enviada como proposta para o
                    fotógrafo selecionado
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Para: (Icone) (Nome do fotógrafo)
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontWeight: "bold", marginRight: "1rem" }}
                      >
                        Enviar mensagem por:
                      </Typography>
                      <RadioGroup
                        row
                        name="messageOption"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <FormControlLabel
                          value="email"
                          control={<Radio color="primary" />}
                          label="Email"
                        />
                        <FormControlLabel
                          value="phone"
                          control={<Radio color="primary" />}
                          label="Telefone"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <TextField
                    label="Mensagem"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={11}
                    minRows={11}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Stack>
              </>
            )}
            {step === 2 && (
              // Etapa 2 (Confirmar)
              <>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{ width: "100%", maxWidth: 860, paddingY: 5 }}
                >
                  <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    Confirmar
                  </Typography>
                  <Typography variant="body1">
                    Confirme as informações que você nos passou nesse
                    formulário
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid item xs={5}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Fotógrafo(a) selecionado:{" "}
                        <Typography variant="body1" component="span">
                          Nome do Fotógrafo
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Tipo de evento:{" "}
                        <Typography variant="body1" component="span">
                          {selectedTema}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Data:{" "}
                        <Typography variant="body1" component="span">
                          {dataEvento}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Proposta:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid grey",
                      marginBottom: 2,
                      width: "100%",
                    }}
                  />
                  <Typography variant="body1">{message}</Typography>

                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Endereço:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid grey",
                      marginBottom: 2,
                      width: "100%",
                    }}
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Estado:{" "}
                        <Typography variant="body1" component="span">
                          {selectedEstado}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Cidade:{" "}
                        <Typography variant="body1" component="span">
                          {cidade}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Bairro:{" "}
                        <Typography variant="body1" component="span">
                          {bairro}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        CEP:{" "}
                        <Typography variant="body1" component="span">
                          {cep}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Rua:{" "}
                        <Typography variant="body1" component="span">
                          {rua}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Nº:{" "}
                        <Typography variant="body1" component="span">
                          {numero}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Complemento:{" "}
                        <Typography variant="body1" component="span">
                          {complemento}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Contato:
                  </Typography>
                  <Box
                    sx={{
                      borderBottom: "1px solid grey",
                      marginBottom: 0,
                      width: "100%",
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Forma de contato:{" "}
                    <Typography variant="body1" component="span">
                      {selectedOption === "email" ? "Email" : "Telefone"}
                    </Typography>
                  </Typography>
                </Stack>
              </>
            )}

            <Stack
              direction="row"
              justifyContent={step === 0 ? "flex-end" : "space-between"} // Ajustado para controlar a posição dos botões
              sx={{ marginTop: 5, width: "100%", maxWidth: 896 }}
            >
              {(step === 1 || step === 2) && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlePrevious}
                  sx={{ marginLeft: "2vh" }}
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "2vh" }}
                onClick={handleNext}
              >
                {step === 2 ? "Enviar" : "Avançar"}
              </Button>
            </Stack>


          </Stack>
        </div>
      </Box>
    </Modal>
  );
}
