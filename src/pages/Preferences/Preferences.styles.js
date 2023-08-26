import { makeStyles } from '@mui/styles'
import iconCheck from 'assets/icons/round-check.svg'

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
  },
  check: {
    position: 'absolute',
    cursor: 'pointer',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'disable',
    backgroundImage: `url(${iconCheck})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}))