import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "50vw",
    width: "50vw",
    maxHeight: "75vh",
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
    padding: theme.spacing(0.5, 0),
    margin: theme.spacing(0, 5),
    alignItems: "center",
    justifyContent: "center",
  },

  lineBelowTitle: {
    borderBottom: "0.5px solid rgba(0,0,0,0.50)",
    paddingBottom: theme.spacing(1),
  },
}))
