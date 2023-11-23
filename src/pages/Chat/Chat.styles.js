import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  sidebar: {
    boxShadow: "0px 8px 8px rgb(0,0,0,0.25)",
    height: "100%",
    backgroundColor: theme.palette.white.main,
    position: "fixed",
    overflowY: "scroll",
    zIndex: 10,
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
    // backgroundColor: "rgba(0,0,0,0.1)",
    position: "fixed",
    height: "100%",
    width: "100%",
    right: 0,
  },

  messagesContainer: {
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}))
