import { makeStyles } from "@mui/styles";
import iconCheck from "assets/icons/round-check.svg";

export default makeStyles((theme) => ({
  checked: {
    filter: "brightness(70%) saturate(150%) contrast(120%)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  image: {
    height: 200,
    width: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
}));
