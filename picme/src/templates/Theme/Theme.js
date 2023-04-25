import { createTheme, ThemeProvider } from "@mui/material"

const Theme = () => {
  const theme = createTheme({
    palette: {
      primary: "#229DD2",
      secondary: "#282828",
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {children}  
    </ ThemeProvider>
  )
}

export default Theme