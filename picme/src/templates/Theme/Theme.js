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
    fontFamily: 'Inter, sans-serif'
  },
  title: {
    fontSize: "48px",
  },
})

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}  
    </ThemeProvider>
  )
}

export default Theme