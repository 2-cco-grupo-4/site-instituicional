import { Box, Typography } from "@mui/material"
import Header from "molecules/Header"
import { useStyles } from "./Home.styles"
import { useTheme } from "@emotion/react"

const Home = () => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <>
      <Header />
      <Box sx={classes.banner}>
        <Typography 
        sx={{
          fontSize: "48px", 
          fontWeight: "bold", 
          width: "35%"
        }}
        color="white.main"
        >
          Transforme sua paixão em sucesso
        </Typography>
      </Box>
    </>
  )
}

export default Home 