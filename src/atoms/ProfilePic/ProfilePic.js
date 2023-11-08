import { Avatar } from "@mui/material"
import { stringAvatar } from "utils/helpers/string"

const ProfilePic = ({ src, alt, autor, ...props }) => {
  const noPicAvatar = {
    ...stringAvatar(autor),
    sx: {
      ...stringAvatar(autor).sx,
      ...props?.sx,
    },
  }
  return (
    <>
      {src ? (
        <Avatar src={src} alt={alt} {...props} />
      ) : (
        <Avatar {...noPicAvatar} />
      )}
    </>
  )
}

export default ProfilePic
