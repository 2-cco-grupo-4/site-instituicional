import { Box, Link, Stack, Typography } from "@mui/material"
import useStyles from "./Footer.styles"
import Container from "atoms/Container"

import iconFacebook from 'assets/icons/facebook.svg'
import iconWhatsapp from 'assets/icons/whatsapp.svg'
import iconInstagram from 'assets/icons/instagram.svg'
import iconTwitter from 'assets/icons/twitter.svg'


const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.footer} py={5}>
      <Container alignItems="center" flexDirection="column">
        <Stack alignItems="center" spacing={4}>
          <Stack direction="row" alignItems="center" justifyContent="center" width="100%" spacing={3}>
              <img src={iconFacebook} alt="" />
              <img src={iconWhatsapp} alt="" />
              <img src={iconInstagram} alt="" />
              <img src={iconTwitter} alt="" />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
              <Link className={classes.nav}>Home</Link>
              <Link className={classes.nav}>Explorar</Link>
              <Link className={classes.nav}>Login</Link>
              <Link className={classes.nav}>Cadastro</Link>
          </Stack>
          <Typography variant="paragraph-xsmall-regular">©2023 PICME | Todos os direitos reservados</Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer