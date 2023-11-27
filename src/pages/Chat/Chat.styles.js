import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  sidebar: {
    boxShadow: "0px 8px 8px rgb(0,0,0,0.25)",
    height: "100%",
    backgroundColor: theme.palette.white.main,
    overflowY: "scroll",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  chatItem: {
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing(3),
    borderBottom: "0.5px solid rgba(0,0,0,0.1)",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0,0,0,0.01)",
    },
  },

  chatItemText: {
    minHeight: "100%",
    width: "100%",
    direction: "column",
    justifyContent: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  chatTextArea: {
    maxHeight: "100dvh",
    minHeight: "100dvh",
    width: "100%",
    overflowY: "scroll",
    justifyContent: "flex-end",
  },

  messagesContainer: {
    height: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflowY: "auto",
    position: "relative",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  inputMessage: {
    position: "sticky !important",
    bottom: theme.spacing(3),
  },
}))
