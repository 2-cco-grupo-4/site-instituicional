import { Avatar, Rating, Stack, Typography } from "@mui/material"
import useStyles from "./FeedAlbum.styles"
import { stringAvatar } from "utils/helpers/string"

const FeedAlbum = ({src, alt, autor, fotoPerfil, altPerfil}) => {
  const classes = useStyles()

  return (
    <Stack className={classes.content}>
      <img src={src} alt={alt} />
      <Stack pt={2} pb={3} flexDirection="row" alignItems="center" columnGap={1}>
        {fotoPerfil ? (
          <Avatar src={fotoPerfil} alt={altPerfil} />
        ) : (
          <Avatar {...stringAvatar(autor)} />
        )}
        <Stack>
          <Typography variant="paragraph-medium-bold">{autor}</Typography>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FeedAlbum