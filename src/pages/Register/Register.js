import useStyles from "./Register.styles"
import Container from "atoms/Container"
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"

const Register = () => {
  const classes = useStyles()
  const { profileType } = useParams()

  return (
    <Grid container>
      <Grid item className={classes.banner} xs={14} sm={7}>
        <Container>
          
        </Container>
      </Grid>
      <Grid item className={classes.content} xs={10} sm={5}>
        <Container>
          <FormControl fullWidth>
            <Stack width="100%" alignItems="center" py={4} spacing={3}>
              <LogoPicme />
              <Typography variant="subtitle-small-semibold">Cadastre-se</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="paragraph-medium-light">Sou um:</Typography>
                <RadioGroup row aria-labelledby="radio-profile-type" defaultValue={profileType}>
                  <FormControlLabel 
                  value="cliente" 
                  control={<Radio />} 
                  label={<Typography variant="paragraph-medium-light">Cliente</Typography>} />

                  <FormControlLabel 
                  value="fotografo" 
                  control={<Radio />}  
                  label={<Typography variant="paragraph-medium-light">Fotógrafo</Typography>} />
                </RadioGroup>
              </Stack>
              <Stack direction="row" alignItems="top">
                <Stack spacing={2}>
                  <TextField id="name-ipt" required label="Nome" />
                  <DatePicker label="Data de nascimento" format="DD/MM/YYYY"/>
                  <TextField id="name-ipt" required label="Nome" />
                </Stack>
                <Stack spacing={2}>

                </Stack>
              </Stack>
            </Stack>
          </FormControl>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Register