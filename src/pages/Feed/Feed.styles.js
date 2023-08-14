import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.white.main,
    boxShadow: '0 1px 16px rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.gray.main,
    "& .MuiButtonBase-root": {
      padding: theme.spacing(2, 5),
      textTransform: 'none',
    },
  },
}))