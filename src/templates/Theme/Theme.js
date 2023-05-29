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
    stroke: {
      main: "rgba(0,0,0,1)",
    },
    stroke50: {
      main: "rgba(0,0,0,0.5)",
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    "title-medium-bold": {
      fontSize: 36,
      fontWeight: 'bold',
    },
    "title-small-bold": {
      fontSize: 32,
      fontWeight: 'bold',
    },
    "subtitle-small-bold": {
      fontSize: 24,
      fontWeight: "bold",
    },
    "paragraph-medium-regular": {
      fontSize: 16,
      fontWeight: "regular",
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
  return (
    <ThemeProvider theme={theme}>
      {children}  
    </ThemeProvider>
  )
}

export default Theme