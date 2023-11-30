import React, { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { CONTRATO } from "service/contrato";
import { useUserContext } from "contexts";

const ContratoEditar = ({ open, setOpen, id_sessao }) => {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const estadosBrasil = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const formasPagamento = [
    "Pix",
    "Cartão de Crédito",
    "Transferência Bancária",
    "Boleto Bancário",
  ];

  const renderSelectEstado = () => {
    return (
      <TextField
        select
        value={enderecoEditado.estado}
        margin="normal"
        label="Estado"
        fullWidth
        onChange={(e) =>
          setEnderecoEditado({
            ...enderecoEditado,
            estado: e.target.value,
          })
        }
        SelectProps={{
          native: true,
        }}
      >
        {estadosBrasil.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </TextField>
    );
  };

  const renderSelectFormaPagamento = () => {
    return (
      <TextField
        select
        value={pagamentoEditado.forma}
        margin="normal"
        label="Forma de pagamento"
        fullWidth
        onChange={(e) =>
          setPagamentoEditado({
            ...pagamentoEditado,
            forma: e.target.value,
          })
        }
        SelectProps={{
          native: true,
        }}
      >
        {formasPagamento.map((forma) => (
          <option key={forma} value={forma}>
            {forma}
          </option>
        ))}
      </TextField>
    );
  };

  const { id, nome, token } = useUserContext();

  const [isEditing, setIsEditing] = useState(false);

  const [idEndereco, setIdEndereco] = useState();
  const [idPagamento, setIdPagamento] = useState();

  const handleEdit = () => {
    setIsEditing(true);

    // Atualize as cópias dos estados quando entrar no modo de edição
    //setPagamentoCopias({ ...pagamentoEditado });
    //setEnderecoCopias({ ...enderecoEditado });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    // Restaure os estados originais ao cancelar a edição
    setPagamentoEditado({ ...pagamentoCopias });
    setEnderecoEditado({ ...enderecoCopias });
  };

  const handleAccept = async () => {
    try {
      const sessaoEditadaAceita = {
        dataRealizacao: messageData.dataRealizacao,
        statusSessao: "Agendada",
      };
      console.log("Sessão editada:", sessaoEditadaAceita);
      await CONTRATO.EDITAR_SESSAO(id_sessao, sessaoEditadaAceita);
      console.log("Contrato Aceito!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao aceitar contrato:", error);
    }
  };

  const handleReject = async () => {
    try {
      const sessaoEditadaRejeita = {
        dataRealizacao: messageData.dataRealizacao,
        statusSessao: "Cancelada",
      };
      console.log("Sessão editada:", sessaoEditadaRejeita);
      await CONTRATO.EDITAR_SESSAO(id_sessao, sessaoEditadaRejeita);
      console.log("Contrato Rejeitado!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao rejeitar contrato:", error);
    }
  };

  const [enderecoEditado, setEnderecoEditado] = useState({
    estado: "",
    cidade: "",
    cep: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  });

  const [pagamentoEditado, setPagamentoEditado] = useState({
    forma: "",
    valor: "",
    parcelas: "",
  });

  const handleSave = async () => {
    try {
      console.log("Pagamento editado:", pagamentoEditado);
      console.log("Endereço editado:", enderecoEditado);

      const sessaoEditadaInfo = {
        dataRealizacao: messageData.dataRealizacao,
        statusSessao: "Negociação",
      };

      console.log("Data editada:", sessaoEditadaInfo);

      const retornoPagamento = await CONTRATO.GET_PAGAMENTO(id_sessao, token);
      const retornoEndereco = await CONTRATO.GET_ENDERECO(id_sessao, token);

      setIdPagamento(retornoPagamento.data.id);
      setIdEndereco(retornoEndereco.data.id);

      console.log("ID Pagamento:", idPagamento);
      console.log("ID Endereço:", idEndereco);

      await CONTRATO.EDITAR_SESSAO(id_sessao, sessaoEditadaInfo);
      await CONTRATO.EDITAR_PAGAMENTO(idPagamento, pagamentoEditado);
      await CONTRATO.EDITAR_ENDERECO(idEndereco, enderecoEditado);

      setPagamentoCopias({ ...pagamentoEditado });
      setEnderecoCopias({ ...enderecoEditado });

      setIsEditing(false);

      setOpen(false);
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
    }
  };

  const [messageData, setMessageData] = useState({
    pagamento: {},
    endereco: {},
  });

  const [pagamentoCopias, setPagamentoCopias] = useState({
    ...messageData.pagamento,
  });
  const [enderecoCopias, setEnderecoCopias] = useState({
    ...messageData.endereco,
  });

  useEffect(() => {
    // ...

    const fetchContrato = async () => {
      try {
        const contrato = await CONTRATO.EXIBIR_CONTRATO(id_sessao, token);
        setMessageData(contrato.data);

        // Atualiza os estados copiados quando os dados do contrato são carregados
        setPagamentoCopias({ ...contrato.data.pagamento });
        setEnderecoCopias({ ...contrato.data.endereco });
      } catch (error) {
        console.error("Erro ao carregar contrato:", error);
        // Adicione lógica de tratamento de erro conforme necessário
      }
    };

    fetchContrato();
  }, [id_sessao, token]);

  const renderContent = () => {
    if (isEditing) {
      return (
        <>
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
                  {renderSelectFormaPagamento()}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={pagamentoEditado.valor}
                    margin="normal"
                    label="Valor"
                    fullWidth
                    onChange={(e) =>
                      setPagamentoEditado({
                        ...pagamentoEditado,
                        valor: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={pagamentoEditado.parcelas}
                    margin="normal"
                    label="Parcelas"
                    fullWidth
                    onChange={(e) =>
                      setPagamentoEditado({
                        ...pagamentoEditado,
                        parcelas: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Seção de Endereço */}
          <Grid container spacing={2} mt={4} borderBottom="1px solid #333">
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Endereço:</strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {renderSelectEstado()}
                  <TextField
                    value={enderecoEditado.cidade}
                    margin="normal"
                    label="Cidade"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        cidade: e.target.value,
                      })
                    }
                  />
                  <TextField
                    value={enderecoEditado.bairro}
                    margin="normal"
                    label="Bairro"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        bairro: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={enderecoEditado.cep}
                    margin="normal"
                    label="CEP"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        cep: e.target.value,
                      })
                    }
                  />
                  <TextField
                    value={enderecoEditado.logradouro}
                    margin="normal"
                    label="Rua"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        logradouro: e.target.value,
                      })
                    }
                  />
                  <TextField
                    value={enderecoEditado.numero}
                    margin="normal"
                    label="Número"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        numero: e.target.value,
                      })
                    }
                  />
                  <TextField
                    value={enderecoEditado.complemento}
                    margin="normal"
                    label="Complemento"
                    fullWidth
                    onChange={(e) =>
                      setEnderecoEditado({
                        ...enderecoEditado,
                        complemento: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    } else {
      // Se não estiver editando, mostrar as informações como Typography
      return (
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Informações de pagamento:</strong>
            </Typography>
            <Typography variant="body1">{pagamentoCopias.forma}</Typography>
            <Typography variant="body1">{`Valor: ${pagamentoCopias.valor}`}</Typography>
            <Typography variant="body1">{`Parcelas: ${pagamentoCopias.parcelas}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Endereço:</strong>
            </Typography>
            <Typography variant="body1">{`Estado: ${enderecoCopias.estado}`}</Typography>
            <Typography variant="body1">{`Cidade: ${enderecoCopias.cidade}`}</Typography>
            <Typography variant="body1">{`Bairro: ${enderecoCopias.bairro}`}</Typography>
            <Typography variant="body1">{`CEP: ${enderecoCopias.cep}`}</Typography>
            <Typography variant="body1">{`Rua: ${enderecoCopias.rua}`}</Typography>
            <Typography variant="body1">{`Número: ${enderecoCopias.numero}`}</Typography>
            <Typography variant="body1">{`Complemento: ${enderecoCopias.complemento}`}</Typography>
          </Grid>
        </Grid>
      );
    }
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

          {/* Mostra Typography ou TextField baseado no estado de edição */}
          {renderContent()}

          {/* Botões de Ação */}
          <Stack direction="row" justifyContent="space-between" mt={4}>
            {!isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAccept}
                >
                  Aceitar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReject}
                >
                  Rejeitar
                </Button>
              </>
            ) : null}
            {!isEditing ? (
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default ContratoEditar;
