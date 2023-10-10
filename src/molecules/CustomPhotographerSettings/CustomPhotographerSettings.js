import useStyles from "./CustomPhotographerSettings.styles";
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material"
import CustomButton from "atoms/CustomButton"
import perfil from "assets/img/foto-perfil-fotografo.png"
import EditIcon from '@mui/icons-material/Edit';
import { Edit } from "@mui/icons-material";


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
          <Button sx={{ width: '1vw', color: "#000", textDecoration: "none", "&:hover": { color: "none" } }} onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Button>

          <Stack width="100%" alignItems="flex-end" flexDirection="column" spacing={3}>
            <Stack width="100%" alignItems="center" spacing={2} sx={{ boxSizing: 'border-box', padding: 1 }} flexDirection="column">
              <Stack
                width="100%"
                alignItems="center"
                spacing={0}
                sx={{ boxSizing: 'border-box', padding: 1 }}
                flexDirection="column"
              >
                <img src={perfil} alt="logo" width="20%" height="40%" />
                <Stack flexDirection="row">
                  <Typography align="center" variant="subtitle-small-bold" fontSize='16px' >
                    Renata Ferreira
                  </Typography>
                </Stack>
                <Typography align="center" variant="subtitle-small-semibold" fontSize='13px'>
                  @referphotos
                </Typography>
              </Stack>
              <Stack width="70%" justifyContent="center" spacing={1}>
                <Typography variant="subtitle-small-bold" fontSize='11px' >
                  Nome
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <TextField
                    id="name-ipt"
                    name="nome"
                    fullWidth
                    disabled
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '8px' }}
                  />
                  <EditIcon></EditIcon>
                </Box>
                <Typography variant="subtitle-small-bold" fontSize='11px' >
                  E-mail
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <TextField
                    id="email-ipt"
                    name="email"
                    fullWidth
                    disabled
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '8px' }}
                  />
                  <EditIcon></EditIcon>
                </Box>
                <Typography variant="subtitle-small-bold" fontSize='11px' >
                  Senha
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                  <TextField
                    id="password-ipt"
                    name="senha"
                    type="password"
                    fullWidth
                    disabled
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '8px' }}
                  />
                  <EditIcon></EditIcon>
                </Box>
              </Stack>

              <CustomButton variant="contained" color="primary" type="submit" width="50%">
                Salvar
              </CustomButton>
              <Stack direction="row" alignItems="center" spacing={0.1}>
                <Typography
                  color="primary"
                  sx={{ fontWeight: "bold", cursor: "pointer", textDecorationLine: "underline" }}
                >
                  Excluir conta
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal >
    </div >
  )
}