import useStyles from "./ChooseProfileType.styles"
import Header from 'molecules/Header'
import { Stack, Typography } from "@mui/material"
import DashedCard from "atoms/DashedCard"
import Container from "atoms/Container"
import imageCustomer from "assets/img/navigating-through-feed.webp"
import imagePhotographer from "assets/img/photographer-nature.jpg"
import CustomButton from "atoms/CustomButton"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "utils/constants"

const ChooseProfileType = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleNavigation = (route) => {
    navigate(route)
  }

  return (
    <>
      <Header type={2} />
      <Container>
        <Stack className={classes.content} spacing={4}>
          <Typography variant="title-small-bold">Em qual perfil você se encaixa?</Typography>
          <Stack direction="row" spacing={5}>
            <DashedCard width={350} alignItems="center" spacing={4}>
              <img src={imageCustomer} alt="customer-navigating-through-feed" className={classes.image}/>
              <Typography variant="paragraph-medium-regular" align="center" width={280}>
               Quero contratar fotógrafos e registrar momentos inesquecíveis
              </Typography>
              <CustomButton onClick={() => handleNavigation(ROUTES.REGISTER + "/cliente")} variant="contained" color="secondary"fullWidth>
                <Typography variant="paragraph-small-regular" color="white">
                  Cadastrar como <strong>cliente</strong>
                </Typography>
              </CustomButton>
            </DashedCard>
            <DashedCard width={350} alignItems="center" spacing={4}>
              <img src={imagePhotographer} alt="customer-navigating-through-feed" className={classes.image}/>
              <Typography variant="paragraph-medium-regular" align="center" width={280}>
                Quero mostrar meu trabalho para o mundo
              </Typography>
              <CustomButton onClick={() => handleNavigation(ROUTES.REGISTER + "/fotografo")}  variant="contained" color="secondary"fullWidth>
                <Typography variant="paragraph-small-regular" color="white">
                  Cadastrar como <strong>fotógrafo</strong>
                </Typography>
              </CustomButton>
            </DashedCard>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default ChooseProfileType