import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => (
  {
    customBtn: {
      fontFamily: 'Inter, sans-serif',
      fontSize: theme.spacing(2),
      textTransform: 'none !important',
      padding: 2, 
      width: 'fit-content', 
      height: 32,
      whiteSpace: 'nowrap',
      borderRadius: 0.5,
    },
  }
))