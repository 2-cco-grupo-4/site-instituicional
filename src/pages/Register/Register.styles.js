import { makeStyles } from '@mui/styles'
import banner from 'assets/img/marriage-nature.jpeg'

export default makeStyles(() => ({
  banner: {
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    height: '100vh',
  },
}))