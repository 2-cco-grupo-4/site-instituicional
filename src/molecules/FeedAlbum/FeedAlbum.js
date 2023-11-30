import { Avatar, Rating, Stack, Typography } from "@mui/material";
import useStyles from "./FeedAlbum.styles";
import { stringAvatar } from "utils/helpers/string";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/constants";
import ProfilePic from "atoms/ProfilePic";
import PictureAlbum from "atoms/PictureAlbum";

const FeedAlbum = ({
  src,
  alt,
  autor,
  fotoPerfil,
  altPerfil,
  onClick,
  noImage,
  noUserInfo,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack className={classes.content} onClick={onClick}>
      {noImage || <PictureAlbum src={src} alt={alt} />}
      {noUserInfo || (
        <Stack
          pt={2}
          pb={3}
          flexDirection="row"
          alignItems="center"
          columnGap={1}
        >
          <ProfilePic src={fotoPerfil} alt={altPerfil} autor={autor} />
          <Stack>
            <Typography variant="paragraph-medium-bold">{autor}</Typography>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default FeedAlbum;
