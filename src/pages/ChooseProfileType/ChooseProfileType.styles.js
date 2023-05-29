import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  content: {
    width: "100%",
    padding: theme.spacing(4,0),
    alignItems: "center", 
    justifyContent: "top",
  },
  image: {
    height: 200,
    width: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
}))