import React, { useState } from "react";
import useStyles from "./ModalEditarImagemPerfil.styles";
import CustomModal from "molecules/CustomModal";
import { Typography, Avatar, Button, Snackbar } from "@mui/material";
import ProfilePic from "atoms/ProfilePic";
import { IMAGEM } from "service/imagem";

const ModalEditarImagemPerfil = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);

      IMAGEM.SALVAR_IMAGEM(file);
    }
  };

  const handleSave = () => {
    setOpen(false);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConfirmationOpen(false);
  };

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      header={
        <Typography variant="paragraph-medium-bold">
          Nova imagem de perfil
        </Typography>
      }
      leftButtonText={"Cancelar"}
      leftButtonProps={{ onClick: handleClose }}
      rightButtonText={"Salvar"}
      rightButtonProps={{ onClick: handleSave }}
    >
      <ProfilePic
        src={selectedImage || "./assets/img/bolo.jpg"}
        alt="Imagem de perfil"
        sx={{ width: "18vw", height: "38vh" }}
      />
      {/* <Avatar alt="" src={selectedImage || "./assets/img/bolo.jpg"} className={classes.avatar} sx={{ width: '18vw', height: '38vh' }} /> */}

      <Button>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
        />

        <label htmlFor="contained-button-file">
          <Typography
            variant="paragraph-medium-regular"
            className={classes.button}
          >
            Selecionar...
          </Typography>
        </label>
      </Button>
    </CustomModal>
  );
};

export default ModalEditarImagemPerfil;
