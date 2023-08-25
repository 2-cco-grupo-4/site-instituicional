import Container from "atoms/Container/Container"
import useStyles from "./Preferences.styles"
import Header from 'molecules/Header'
import { Stack, Typography, useTheme } from "@mui/material"
import LogoPicme from "atoms/LogoPicme/LogoPicme"

const Preferences = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Container flexDirection="column" pt={4} rowGap={8}>
      <Stack flexDirection="column" rowGap={2}>
        <Stack flexDirection="row" width="100%" justifyContent="space-between">
          <Stack flexDirection="column">
            <Typography variant="subtitle-small-bold">
              Quais são seus interesses?
            </Typography>
            <Typography>
              Selecione os tópicos que você mais se identifica!
            </Typography>
          </Stack>
          <LogoPicme />
        </Stack>
        <Stack>
          <Typography variant="subtitle-small-bold">Tema</Typography>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Preferences