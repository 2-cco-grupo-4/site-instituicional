import useStyles from "./ChooseProfileType.styles"
import Header from 'molecules/Header'
import { Stack } from "@mui/material"
import { Container } from "@mui/system"

const ChooseProfileType = () => {
  const classes = useStyles()

  return (
    <>
      <Header type={2} />
      <Stack>
        <Container>
        </Container>
      </Stack>
    </>
  )
}

export default ChooseProfileType