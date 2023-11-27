import React, { useState } from 'react';
import useStyles from "./ModalEditarImagemPerfil.styles";
import CustomModal from 'molecules/CustomModal';
import { Typography, Avatar } from '@mui/material';
import ImageUpload from 'molecules/ImageUpload';

const ModalEditarImagemPerfil = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpen(false);

  };


  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      header={<Typography variant='paragraph-medium-bold'>Nova imagem de perfil</Typography>}
      leftButtonText={"Cancelar"}
      leftButtonProps={{ onClick: handleClose }}
      rightButtonText={"Salvar"}
    >
      <Avatar alt="" src="./assets/img/bolo.jpg" className={classes.avatar} sx={{ width: '22vw', height: '45vh' }} />

      <input
        accept="image/*"
        className={classes.input}
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </CustomModal >
  );
};

export default ModalEditarImagemPerfil;
