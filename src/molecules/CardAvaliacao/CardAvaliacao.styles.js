import { Margin } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  sectionAvaliacao: {
    border: "1px dashed black",
    backgroundColor: theme.palette.white.main,
    boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: theme.shape.borderRadius * 4,
    maxWidth: "100%",
    padding: "12px",
    marginBottom: "0",
  },
}));
