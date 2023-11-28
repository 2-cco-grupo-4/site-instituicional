import useStyles from "./Contrato.styles";
import { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  MenuItem,
  useTheme,
  Avatar,
} from "@mui/material";
import CustomModal from "molecules/CustomModal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contractSchema } from "./Contrato.schema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputMask from "react-input-mask";
import { stringAvatar, toLocalDate } from "utils/helpers/string";
import CustomButton from "atoms/CustomButton";
import { useNavigate } from "react-router";
import { ROUTES } from "utils/constants";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import db from "service/firebase";
import { useUserContext } from "contexts";
import { TEMA } from "service/tema";
import { CONTRATO } from "service/contrato";

const Contract = ({ open, setOpen, fotografo }) => {
  const [temas, setTemas] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const { id, nome, token } = useUserContext();

  const [step, setStep] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [genericError, setGenericError] = useState(false);
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(false);

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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contractSchema) });

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await TEMA.LISTAR_TEMA();
        setTemas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de temas", error.response.data);
        console.log(error);
      }
    };

    fetchTemas();
  }, []);

  const createChat = async ({ callback, onError }) => {
    console.log("Iniciando criação do chat...");
    setLoading(true);

    try {
      const sessionPayload = {
        dataRealizacao: contract.data,
        statusSessao: "Proposta",
        idFotografo: fotografo.id,
        idCliente: Number(id),
        idTema: temas.find((tema) => tema.nome === contract.tema)?.id,
        createdAt: new Date().toISOString(),
      };

      console.log("Session Payload:", sessionPayload);
      const sessionResponse = await CONTRATO.CADASTRAR_SESSAO(
        sessionPayload,
        token
      );
      console.log("Session Response:", sessionResponse);

      const idSessao = sessionResponse.data.id;

      await cadastrarEndereco(idSessao);

      await cadastrarPagamento(idSessao);

      await criarChat(idSessao);

      callback();
      console.log("Chat criado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar chat:", err);
      onError();
    } finally {
      setLoading(false);
    }
  };

  const cadastrarPagamento = async (idSessao) => {
    console.log("Iniciando cadastro do pagamento...");
    const pagamentoPayload = {
      forma: contract.formaPagamento,
      valor: contract.valor,
      parcelas: contract.parcelas,
      idSessao,
    };

    console.log("Pagamento Payload:", pagamentoPayload);
    await CONTRATO.CADASTRAR_PAGAMENTO(pagamentoPayload, token);
    console.log("Pagamento cadastrado com sucesso!");
  };

  const cadastrarEndereco = async (idEvento) => {
    console.log("Iniciando cadastro do endereço...");
    const addressPayload = {
      estado: contract.estado,
      cidade: contract.cidade,
      cep: contract.cep,
      bairro: contract.bairro,
      logradouro: contract.rua,
      numero: contract.numero,
      complemento: contract.complemento,
      idEvento,
    };

    console.log("Address Payload:", addressPayload);
    await CONTRATO.CADASTRAR_ENDERECO(addressPayload, token);
    console.log("Endereço cadastrado com sucesso!");
  };

  const criarChat = async (idSessao) => {
    console.log("Iniciando criação do chat no banco de dados...");
    const chatRef = await addDoc(collection(db, "chats"), {
      id_contratante: Number(id),
      id_fotografo: fotografo.id,
      nome_contratante: nome,
      nome_fotografo: fotografo.nome,
      data_ultima_mensagem: new Date(),
      id_sessao: idSessao,
    });

    console.log("Chat criado:", chatRef);

    const chatId = chatRef.id;

    await adicionarMensagemInicial(chatId);

    const chatDoc = doc(db, "chats", chatId);
    await atualizarUltimaMensagem(chatDoc);
    console.log("Chat criado com sucesso!");
  };

  const adicionarMensagemInicial = async (chatId) => {
    console.log("Adicionando mensagem inicial ao chat...");
    await addDoc(collection(db, "chats", chatId, "mensagens"), {
      mensagem:
        contract?.mensagem ||
        "Muito obrigado por estabelecermos o contrato! Estou ansioso para trabalhar com você e criar momentos especiais juntos. Se você tiver alguma dúvida ou precisar de alguma assistência, por favor, não hesite em perguntar. Vamos tornar este projeto incrível!",
      horario_envio: new Date(),
      id_usuario: Number(id),
    });
    console.log("Mensagem inicial adicionada com sucesso!");
  };

  const atualizarUltimaMensagem = async (chatDoc) => {
    console.log("Atualizando última mensagem no chat...");
    await updateDoc(chatDoc, {
      ultima_mensagem:
        contract?.mensagem ||
        "Muito obrigado por estabelecermos o contrato! Estou ansioso para trabalhar com você e criar momentos especiais juntos. Se você tiver alguma dúvida ou precisar de alguma assistência, por favor, não hesite em perguntar. Vamos tornar este projeto incrível!",
    });
    console.log("Última mensagem atualizada com sucesso!");
  };

  const onSubmit = (payload) => {
    switch (step) {
      case 0:
        const data = payload?.data?.toISOString().substring(0, 10);
        const horario = new Date(payload?.horario).toLocaleTimeString();
        const contractInfo = {
          ...payload,
          data,
          horario,
        };
        setContract((current) => ({
          ...current,
          ...contractInfo,
        }));
        setStep(1);
        setProgressBar(50);
        break;
      case 1:
        setContract((current) => ({
          ...current,
          mensagem: payload?.mensagem,
          formaPagamento: payload?.formaPagamento,
          valor: payload?.valor,
          parcelas: payload?.parcelas,
        }));
        console.log(payload?.mensagem);
        setStep(2);
        setProgressBar(100);
        break;
      case 2:
        console.log(contract);
        createChat({
          callback: () => setStep(3),
          onError: () => console.log("erro"),
        });
        break;
    }
  };

  const handleGoBack = () => {
    setStep((current) => current - 1);
  };

  useEffect(() => {
    console.log(fotografo);
  }, [fotografo]);

  const ContractInfo = () => (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle-small-bold">
            Informações Essenciais
          </Typography>
          <Typography>
            Precisamos dessas informações para determinar o tipo de evento.
          </Typography>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="tema"
                select
                label="Tema"
                fullWidth
                defaultValue="Tema 1"
                {...register("tema")}
                error={!!errors?.tema || genericError}
                helperText={errors?.tema?.message}
              >
                {temas.map((tema) => (
                  <MenuItem key={tema.id} value={tema.nome}>
                    {tema.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="data"
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="Data"
                      format="DD/MM/YYYY"
                      value={field?.value}
                      inputRef={field?.ref}
                      onChange={(currentDate) => {
                        field?.onChange(currentDate);
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors?.data || genericError,
                          helperText: errors?.data?.message,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="horario"
                render={({ field }) => {
                  return (
                    <TimePicker
                      label="Horário"
                      format="HH:mm"
                      ampm={false}
                      value={field?.value}
                      onChange={(currentTime) => {
                        console.log(currentTime);
                        field?.onChange(currentTime);
                      }}
                      sx={{ width: "100%" }}
                      slotProps={{
                        textField: {
                          error: !!errors?.horario || genericError,
                          helperText: errors?.horario?.message,
                        },
                      }}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle-small-bold">Endereço</Typography>
          <Typography>Insira o endereço do seu evento</Typography>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <InputMask mask="99999-999" {...register("cep")}>
                {() => (
                  <TextField
                    name="cep"
                    label="CEP"
                    fullWidth
                    error={!!errors?.cep || genericError}
                    helperText={errors?.cep?.message}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="estado"
                select
                label="Estado"
                fullWidth
                {...register("estado")}
                error={!!errors?.estado || genericError}
                helperText={errors?.estado?.message}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  },
                }}
              >
                {estadosBrasil.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="cidade"
                label="Cidade"
                fullWidth
                {...register("cidade")}
                error={!!errors?.cidade || genericError}
                helperText={errors?.cidade?.message}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="bairro"
                label="Bairro"
                fullWidth
                {...register("bairro")}
                error={!!errors?.bairro || genericError}
                helperText={errors?.bairro?.message}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="rua"
                label="Rua"
                fullWidth
                {...register("rua")}
                error={!!errors?.rua || genericError}
                helperText={errors?.rua?.message}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name="numero"
                type="number"
                label="Nº"
                fullWidth
                {...register("numero")}
                error={!!errors?.numero || genericError}
                helperText={errors?.numero?.message}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name="complemento"
                label="Complemento"
                fullWidth
                {...register("complemento")}
                error={!!errors?.complemento || genericError}
                helperText={errors?.complemento?.message}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );

  const Message = () => (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle-small-bold">Mensagem</Typography>
          <Typography>
            Essa mensagem será enviada como proposta para o fotógrafo
            selecionado.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="paragraph-medium-bold">Para:</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Avatar
                {...stringAvatar(fotografo?.nome)}
                sx={{ width: theme.spacing(4), height: theme.spacing(4) }}
              />
              <Typography variant="paragraph-medium-regular">
                {fotografo.nome}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <TextField
          label="Mensagem"
          multiline
          helperText={
            errors?.mensagem?.message || 'Aperte "Enter" para quebrar a linha'
          }
          {...register("mensagem")}
        />
      </Stack>

      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle-small-bold">Pagamento</Typography>
          <Typography>
            Insira as informações de pagamento para confirmar a proposta.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <TextField
            name="formaPagamento"
            select
            label="Forma de Pagamento"
            fullWidth
            defaultValue="Cartão de Crédito"
            {...register("formaPagamento")}
            error={!!errors?.formaPagamento || genericError}
            helperText={errors?.formaPagamento?.message}
          >
            <MenuItem value="Pix">PIX</MenuItem>
            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
            <MenuItem value="Transferência Bancária">
              Transferência Bancária
            </MenuItem>
            <MenuItem value="Boleto Bancário">Boleto Bancário</MenuItem>
          </TextField>
        </Stack>
        <Stack spacing={1}>
          <TextField
            name="valor"
            type="number"
            label="Valor (R$)"
            fullWidth
            {...register("valor")}
            error={!!errors?.valor || genericError}
            helperText={errors?.valor?.message}
          />
        </Stack>
        <Stack spacing={1}>
          <TextField
            name="parcelas"
            type="number"
            label="Número de Parcelas"
            fullWidth
            {...register("parcelas")}
            error={!!errors?.parcelas || genericError}
            helperText={errors?.parcelas?.message}
          />
        </Stack>
      </Stack>
    </Stack>
  );

  const Confirm = () => (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle-small-bold">Confirmar</Typography>
          <Typography>
            Confirme as informações que você nos passou nesse formulário.
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">
                Fotógrafo(a):
              </Typography>
              <Typography>{fotografo.nome}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Tema:</Typography>
              <Typography>{contract?.tema}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Data:</Typography>
              <Typography>{toLocalDate(contract?.data)}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Stack spacing={1}>
        <Typography
          variant="paragraph-medium-bold"
          className={classes.lineBelowTitle}
        >
          Proposta:
        </Typography>
        <Typography>{contract?.mensagem || "N/A"}</Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography
          mb={1}
          variant="paragraph-medium-bold"
          className={classes.lineBelowTitle}
        >
          Informações de Pagamento:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">
                Forma de Pagamento:
              </Typography>
              <Typography>{contract?.formaPagamento}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">
                Valor (R$):
              </Typography>
              <Typography>{contract?.valor}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">
                Número de Parcelas:
              </Typography>
              <Typography>{contract?.parcelas}</Typography>
            </Stack>
          </Grid>
          {/* Adicione mais itens do Grid conforme necessário */}
        </Grid>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography
          mb={1}
          variant="paragraph-medium-bold"
          className={classes.lineBelowTitle}
        >
          Endereço:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Estado:</Typography>
              <Typography>{contract?.estado}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Cidade:</Typography>
              <Typography>{contract?.cidade}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Bairro:</Typography>
              <Typography>{contract?.bairro}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">CEP:</Typography>
              <Typography>{contract?.cep}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Rua:</Typography>
              <Typography>{contract?.rua}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Nº:</Typography>
              <Typography>{contract?.numero}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              columnGap={1}
            >
              <Typography variant="paragraph-medium-bold">
                Complemento:
              </Typography>
              <Typography>{contract?.complemento || "N/A"}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );

  const Final = () => (
    <Stack justifyContent="center" alignItems="center" rowGap={3}>
      <Typography variant="subtitle-small-bold">
        Proposta enviada! 🎉
      </Typography>
      <Typography textAlign="center">
        Você acaba de contactar um de nossos fotógrafos! Para encontrar mais
        fotógrafos, você pode voltar ao nosso feed clicando no botão abaixo.
      </Typography>
      <CustomButton
        color="secondary"
        variant="contained"
        onClick={() => navigate(ROUTES.CHAT)}
      >
        Ir para chat com fotógrafo
      </CustomButton>
    </Stack>
  );

  const ContractProgress = () => (
    <LinearProgress
      value={progressBar}
      variant="determinate"
      sx={{
        width: "80%",
        height: 6,
        borderRadius: 3,
      }}
    />
  );

  const stepContents = [<ContractInfo />, <Message />, <Confirm />, <Final />];

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      onSubmit={handleSubmit(onSubmit)}
      leftButtonText={step !== 0 && step !== 3 && "Voltar"}
      leftButtonProps={{ onClick: () => handleGoBack() }}
      rightButtonText={step !== 3 && "Avançar"}
      rightButtonProps={{ loading }}
      header={step === 3 || <ContractProgress />}
    >
      {stepContents[step]}
    </CustomModal>
  );
};

export default Contract;
