import { Avatar } from "@mui/material"
import useStyles from "./ProfilePic.styles"
import { stringAvatar } from "utils/helpers/string"

const ProfilePic = ({ altPerfil, fotoPerfil, nome }) => {
  const classes = useStyles()

  return fotoPerfil ? (
    <Avatar src={fotoPerfil} alt={altPerfil} />
  ) : (
    <Avatar {...stringAvatar(nome)} />
  )
}

export default ProfilePic
