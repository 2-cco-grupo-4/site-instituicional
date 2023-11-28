import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({

  avatar: {
    margin: 'auto',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
}));
