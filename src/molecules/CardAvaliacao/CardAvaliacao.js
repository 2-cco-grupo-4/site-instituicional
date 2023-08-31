import {
  Container,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import useStyles from "./CardAvaliacao.styles";
import FeedAlbum from "molecules/FeedAlbum/FeedAlbum";

import noivosSorriso from "assets/img/noivos-sorriso.png";
import noivaFlorestaBuque from "assets/img/noiva-floresta-buque.png";
import noivosPonte from "assets/img/noivos-ponte.png";
import cerimonia from "assets/img/cerimonia.png";
import { Component } from "react";

const imageList = [
  {
    alt: "noivos-sorriso",
    src: noivosSorriso,
  },
  {
    alt: "noiva-floresta-buque",
    src: noivaFlorestaBuque,
  },
  {
    alt: "noivosPonte",
    src: noivosPonte,
  },
  {
    alt: "cerimonia",
    src: cerimonia,
  },
];

const CardAvaliacao = ({ name }) => {
  const classes = useStyles();

  return (
    <Stack className={classes.sectionAvaliacao}>
      <FeedAlbum autor={name} />
      <Typography>
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </Typography>
      <ImageList variant="standard" cols={4} gap={8}>
        {imageList.map(({ index, alt, src }) => (
          <ImageListItem key={index}>
            <img src={src} alt={alt} />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  );
};

export default CardAvaliacao;

// {imageList.map(({ index, alt, src }) => (
//   <img
//     style={{ height: "100%", objectFit: "cover" }}
//     src={src}
//     alt={alt}
//   />
// ))}
