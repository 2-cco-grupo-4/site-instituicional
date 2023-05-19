import { Box, Stack } from "@mui/material"
import useStyles from "./Footer.styles"
import Container from "atoms/Container"

import iconFacebook from 'assets/icons/facebook.svg'
import iconWhatsapp from 'assets/icons/whatsapp.svg'
import iconInstagram from 'assets/icons/instagram.svg'
import iconTwitter from 'assets/icons/twitter.svg'
import { useTheme } from "@mui/styles"


const Footer = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Box className={classes.footer} py={5}>
      <Container>
        <Stack direction="row" alignItems="center" spacing={2}>
            <img src={iconFacebook} alt="" />
            <img src={iconWhatsapp} alt="" />
            <img src={iconInstagram} alt="" />
            <img src={iconTwitter} alt="" />
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer