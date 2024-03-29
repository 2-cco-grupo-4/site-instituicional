import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import InputMask from "react-input-mask";
import { FOTOGRAFO } from "service/calendario";
import { useUserContext } from "contexts";
export default function ResponsiveDialog({ open, handleClose, onConfirm }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { id, nome, token } = useUserContext();
  const [formData, setFormData] = useState({ statusSessao: "Agendamento" });
  const estadosBrasileiros = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  const handleConfirm = () => {

    setConfirmOpen(true);
  };

  const handleConfirmFinal = () => {
    var dataRealizacao = new Date(formData.data + " " + formData.horario + ":00");
    formData.dataRealizacao = dataRealizacao.toISOString();
    formData.idFotografo = id;
    delete formData.horario;
    delete formData.data;


    FOTOGRAFO.CADASTRAR_EVENTO(formData, token).then((response) => {
      console.log(response.data);
      console.log(token + " : token ")
    });

    setConfirmOpen(false);
    onConfirm(formData);
  };
  const handleCepChange = async (e) => {
    const cep = e.target.value;

    setFormData((prevFormData) => ({ ...prevFormData, cep }));

    if (cep.length === 9) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    }
  };


  const handleBack = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Dialog
        open={open && !confirmOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Cadastrar evento externo"}
        </DialogTitle>
        <DialogContent>
          <h2>Cliente</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Cliente"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, cliente: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Telefone cliente"
                    fullWidth
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
          <h2>Evento</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="time"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, horario: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <h2>Endereço</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={handleCepChange}
              >
                {(inputProps) => (
                  <TextField {...inputProps} label="CEP" fullWidth />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Endereço"
                fullWidth
                value={formData.endereco || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Cidade"
                fullWidth
                value={formData.cidade || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cidade: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bairro"
                fullWidth
                value={formData.bairro || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bairro: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Estado"
                fullWidth
                value={formData.estado || ""}
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }

              >
                {estadosBrasileiros.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Complemento"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, complemento: e.target.value })
                }
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">
          {"Confirmação do Evento"}
        </DialogTitle>
        <DialogContent>
          <div>
            <p>
              <strong>Cliente:</strong> {formData.cliente}
            </p>
            <p>
              <strong>Telefone:</strong> {formData.telefone}
            </p>
            <p>
              <strong>Data:</strong> {formData.data}
            </p>
            <p>
              <strong>Horário:</strong> {formData.horario}
            </p>
            <p>
              <strong>Endereço:</strong> {formData.endereco}
            </p>
            <p>
              <strong>Cidade:</strong> {formData.cidade}
            </p>
            <p>
              <strong>Bairro:</strong> {formData.bairro}
            </p>
            <p>
              <strong>Estado:</strong> {formData.estado}
            </p>
            <p>
              <strong>Complemento:</strong> {formData.complemento}
            </p>

          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleBack} color="primary">
            Voltar
          </Button>
          <Button onClick={handleConfirmFinal} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
