import background from 'assets/img/banner-fotografo.jpg'
import { HEADER_HEIGHT } from 'constants/header'
import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  banner: {
    height: `calc(90vh - ${HEADER_HEIGHT})`,
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
    boxShadow: '0 1px 16px 4px rgba(0,0,0,0.5)',
    position: 'relative',
  },
  section: {
    
  }
}))