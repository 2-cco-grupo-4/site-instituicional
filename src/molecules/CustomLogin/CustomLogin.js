import useStyles from "./CustomLogin.styles"
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material"
import CustomButton from "atoms/CustomButton"
import logo from "assets/icons/logo-picme-azul.svg"


export default function BasicModal() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Button sx={{ color: "#fff", textDecoration: "none", "&:hover": { color: "red" } }} onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Button>
          <Box className={classes.font} sx={{width:'40%', height:0}}>
            <Box sx={{width:'100%',boxSizing: 'border-box', padding: 2}}>
            <Typography variant="subtitle-small-semibold" sx={{fontSize: '30px'}}>
            Faça login para contratar fotógrafos 
          </Typography>
            </Box>
          </Box>
          <div className={classes.textContainer}>
            <Stack width="100%" alignItems="flex-end" flexDirection="column"spacing={3}>
              <Stack width="50%" alignItems="center" spacing={2} sx={{boxSizing: 'border-box', padding: 2}}>
              <img src={logo} alt="logo" width="40%" height="40%" />
                <Typography variant="subtitle-small-semibold">Login</Typography>
                <Stack width="100%" justifyContent="center" spacing={3}>
                  <TextField
                    id="email-ipt"
                    name="email"
                    label="E-mail"
                    fullWidth
                  />
                  <TextField
                    id="password-ipt"
                    name="senha"
                    type="password"
                    label="Senha"
                    fullWidth
                  />
                </Stack>
              
              <CustomButton variant="contained" color="secondary" type="submit" fullWidth>
                Entrar
              </CustomButton>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography sx={{ fontWeight: 300 }}>
                  Não tem um cadastro?
                </Typography>
                <Typography
                  color="primary"
                  sx={{ fontWeight: "bold", cursor: "pointer"}}
                >
                  Cadastre-se
                </Typography>
              </Stack>
            </Stack>
            </Stack>
          </div>
        </Box>
      </Modal >
    </div >
  )
}
