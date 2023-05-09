import { useTheme } from '@mui/material/styles'
import background from 'assets/img/banner-fotografo.jpg'
import { HEADER_HEIGHT } from 'constants/header'

const makeStyles = () => {
  const theme = useTheme()
  return (
    {
      banner: {
        height: `calc(90vh - ${HEADER_HEIGHT})`,
        width: '100%',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxSizing: "border-box"
      },
      section: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.white.main,
        boxShadow: '0 1px 16px rgba(0,0,0,0.1)',
      },
    }
  )
}

export const useStyles = () => makeStyles()