import { Box, Typography } from "@mui/material"
import Container from "atoms/Container"
import CustomButton from "atoms/CustomButton"
import Header from "molecules/Header"
import { useStyles } from "./Home.styles"

const Home = () => {
  const classes = useStyles()
  return (
    <Box>
      <Header />
      <Container 
      alignItems="center" 
      sx={classes.banner}
      >
        <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="left" 
        width="35%"
        >
          <Typography
          fontSize="48px" 
          fontWeight="bold"
          mb={2}
          color="white.main"
          >
            Transforme sua paixão em sucesso
          </Typography>
          <CustomButton variant="contained">Começar!</CustomButton>
        </Box>
      </Container>
      <Box style={classes.section}>
        <Container alignItems="center" flexDirection="column" py={2}>
          <Typography id="galeria" fontSize={24} fontWeight='bold' >
            Galeria
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Home 