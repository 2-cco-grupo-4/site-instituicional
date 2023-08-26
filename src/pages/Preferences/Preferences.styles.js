import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  bg: {
    color: '#fff',
    aspectRatio: 8 / 5,
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 'inherit',
    cursor: 'pointer',
  }
}))