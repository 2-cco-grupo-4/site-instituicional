import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "60vw",
    width: "60vw",
    height: "fit-content",
    backgroundColor: theme.palette.white.main,
    border: "0px solid #000",
    borderRadius: "2vh",
    boxShadow: 24,
    padding: theme.spacing(2, 4),
  },

  modalHeader: {
    position: "relative",
    flexDirection: "row",
    minHeight: theme.spacing(4),
  },

  closeButton: {
    left: 0,
    top: 0,
    position: "absolute !important",
    fontSize: theme.spacing(3) + " !important",
    color: theme.palette.stroke.main + " !important",
    borderRadius: theme.shape.borderRadius * 2 + " !important",
    padding: theme.spacing(0.5) + " !important",
    border: "1.5px solid #000 !important",
    maxWidth: "fit-content !important",
    minWidth: "0 !important",
    maxHeight: "fit-content !important",
  },

  textContainer: {
    width: "100%",
    minHeight: theme.spacing(4),
    padding: theme.spacing(0, 5),
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))
