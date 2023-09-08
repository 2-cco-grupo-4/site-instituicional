import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const ImageStack = styled("div")`
  flex: 1;
`;

export const UserArea = styled("div")`
  display: flex;
  align-items: flex-start;
`;

export const UserNameTypography = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
`;

export const ImageContainer = styled("div")``;

export const ImageElement = styled("img")``;

export const ImageInfo = styled("div")``;

export const Title = styled("h2")``;

export const Tag = styled("p")``;

export const Sidebar = styled("div")`
  width: 39.65277%;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 20px;
`;

export const AvaliacaoBox = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px;
  border-top:2px solid black ;

`;

export const StarIcon = styled("span")`
  font-size: 48px;
  color: gold;
`;
