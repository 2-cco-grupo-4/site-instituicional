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
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    titleBold: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    subtitleBold: {
      fontSize: 24,
      fontWeight: "bold",
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