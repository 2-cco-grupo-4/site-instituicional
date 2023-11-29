import { useState } from "react"
import useStyles from "./PictureAlbum.styles"
import { useEffect } from "react"
import IconBrokenImage from "@mui/icons-material/ImageNotSupported"
import { Stack, useTheme } from "@mui/material"

const PictureAlbum = ({ src, alt, ...props }) => {
  const theme = useTheme()
  const [error, setError] = useState(false)

  useEffect(() => {
    if (src) {
      setError(false)
    } else {
      setError(true)
    }
  }, [src])

  return error ? (
    <Stack
      width={props?.width || "100%"}
      height={props?.height || 400}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.whiteSoft.main,
        fontSize: theme.spacing(8),
        color: theme.palette.gray.main,
      }}
      {...props}
    >
      <IconBrokenImage />
    </Stack>
  ) : (
    <img src={src} alt={alt} onError={() => setError(true)} {...props} />
  )
}

export default PictureAlbum
