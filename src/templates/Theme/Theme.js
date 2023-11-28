import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#229DD2",
    },
    secondary: {
      main: "#282828",
    },
    white: {
      main: "#FFFFFF",
    },
    whiteSoft: {
      main: "rgba(0, 0, 0, 0.05)",
    },
    gray: {
      main: "rgba(208, 208, 208, 0.5)",
    },
    stroke: {
      main: "rgba(0,0,0,1)",
    },
    stroke50: {
      main: "rgba(0,0,0,0.5)",
    },
    stroke25: {
      main: "rgba(0,0,0,0.25)",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    "title-medium-bold": {
      fontSize: 36,
      fontWeight: "bold",
    },
    "title-small-bold": {
      fontSize: 32,
      fontWeight: "bold",
    },
    "subtitle-small-semibold": {
      fontSize: 24,
      fontWeight: "600",
    },
    "subtitle-small-bold": {
      fontSize: 24,
      fontWeight: "bold",
    },
    "paragraph-large-bold": {
      fontSize: 20,
      fontWeight: "bold",
    },
    "paragraph-large-regular": {
      fontSize: 20,
      fontWeight: "regular",
    },
    "paragraph-medium-bold": {
      fontSize: 16,
      fontWeight: "bold",
    },
    "paragraph-medium-regular": {
      fontSize: 16,
      fontWeight: "regular",
    },
    "paragraph-medium-light": {
      fontSize: 16,
      fontWeight: 300,
    },
    "paragraph-small-regular": {
      fontSize: 14,
      fontWeight: "regular",
    },
    "paragraph-xsmall-regular": {
      fontSize: 12,
      fontWeight: "regular",
    },
  },
  spacing: 8,
})

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
