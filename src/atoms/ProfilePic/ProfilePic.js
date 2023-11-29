import { Avatar } from "@mui/material";
import { stringAvatar } from "utils/helpers/string";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/constants";
import { IMAGEM } from "service/imagem";
import { useEffect } from "react";

const ProfilePic = ({ src, alt, autor, ...props }) => {
  const noPicAvatar = {
    ...stringAvatar(autor),
    sx: {
      ...stringAvatar(autor).sx,
      ...props?.sx,
    },
  };

  const getImagem = async (src) => {
    const imagem = await Promise.all(
      src.map(async (item, index) => {
        try {
          const response = await IMAGEM.GET_OBJECT_PERFIL(item.id);
          const tipoImagem = response.headers["content-type"] || "image/png";

          const blob = new Blob([response.data], {
            type: tipoImagem,
          });

          const url = URL.createObjectURL(blob);

          return <Avatar src={url} alt={item.alt} {...props} />;
        } catch (error) {
          console.error("Erro ao buscar imagem:", error);
          return <Avatar {...noPicAvatar} />;
        }
      })
    );

    return imagem;
  };

  return <>{src ? getImagem(src) : <Avatar {...noPicAvatar} />}</>;
};

export default ProfilePic;
