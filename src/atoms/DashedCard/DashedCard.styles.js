import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),  
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.shape.borderRadius,
    border: '1px dashed',
    borderColor: theme.palette.stroke50.main, 
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.20)",    
  },
}))