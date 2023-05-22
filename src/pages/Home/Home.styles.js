import background from 'assets/img/banner-fotografo.jpg'
import { HEADER_HEIGHT } from 'utils/constants'
import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  banner: {
    height: `calc(100vh - ${HEADER_HEIGHT})`,
    width: '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxSizing: "border-box"
  },
  separator: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main,
    boxShadow: '0 1px 16px 0px rgba(0,0,0,0.5)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    zIndex: 10,
    width: 0,
    height: 0,
    top: '98%',
    border: '16px solid transparent',
    borderTopColor: theme.palette.secondary.main,
  },
  section: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))