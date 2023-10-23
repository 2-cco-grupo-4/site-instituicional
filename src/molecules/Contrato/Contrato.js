import useStyles from "./Contrato.styles"
import { useState } from "react"
import {
  Grid,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  MenuItem,
  useTheme,
  Avatar,
} from "@mui/material"
import CustomModal from "molecules/CustomModal"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { contractSchema } from "./Contrato.schema"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import InputMask from "react-input-mask"
import { stringAvatar, toLocalDate } from "utils/helpers/string"

const Contract = ({ open, setOpen }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [step, setStep] = useState(0)
  const [genericError, setGenericError] = useState(false)
  const [contract, setContract] = useState({})

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contractSchema) })

  const onSubmit = (payload) => {
    switch (step) {
      case 0:
        const data = payload?.data?.toISOString().substring(0, 10)
        const horario = new Date(payload?.horario).toLocaleTimeString()
        const contractInfo = {
          ...payload,
          data,
          horario,
        }
        setContract((current) => ({
          ...current,
          ...contractInfo,
        }))
        setStep(1)
        break
      case 1:
        setContract((current) => ({
          ...current,
          mensagem: payload?.mensagem,
        }))
        console.log(payload?.mensagem)
        setStep(2)
        break
      case 3:
        console.log(payload)
        break
    }
  }

  const handleGoBack = () => {
    setStep((current) => current - 1)
  }

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
                <MenuItem value="Tema 1">Tema 1</MenuItem>
                <MenuItem value="Tema 2">Tema 2</MenuItem>
                <MenuItem value="Tema 3">Tema 3</MenuItem>
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
                        field?.onChange(currentDate)
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors?.data || genericError,
                          helperText: errors?.data?.message,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  )
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
                        console.log(currentTime)
                        field?.onChange(currentTime)
                      }}
                      sx={{ width: "100%" }}
                      slotProps={{
                        textField: {
                          error: !!errors?.horario || genericError,
                          helperText: errors?.horario?.message,
                        },
                      }}
                    />
                  )
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
                label="Estado"
                fullWidth
                {...register("estado")}
                error={!!errors?.estado || genericError}
                helperText={errors?.estado?.message}
              />
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
  )

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
                {...stringAvatar("Renata Ferreira")}
                sx={{ width: theme.spacing(4), height: theme.spacing(4) }}
              />
              <Typography variant="paragraph-medium-regular">
                Renata Ferreira
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
    </Stack>
  )

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
              <Typography>Renata Ferreira</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="paragraph-medium-bold">Tema:</Typography>
              <Typography>Casamento</Typography>
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
          variant="paragraph-medium-bold"
          className={classes.lineBelowTitle}
        >
          Endereço:
        </Typography>
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
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
              <Stack direction="row" alignItems="center" columnGap={1}>
                <Typography variant="paragraph-medium-bold">
                  Complemento:
                </Typography>
                <Typography>{contract?.complemento || "N/A"}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  )

  const stepContents = [<ContractInfo />, <Message />, <Confirm />]

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      onSubmit={handleSubmit(onSubmit)}
      leftButtonText={step !== 0 && "Voltar"}
      leftButtonProps={{ onClick: () => handleGoBack() }}
      rightButtonText="Avançar"
    >
      {stepContents[step]}
    </CustomModal>
  )
}

export default Contract
