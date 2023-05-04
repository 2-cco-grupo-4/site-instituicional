import background from 'assets/img/banner-fotografo.jpg'
import { HEADER_HEIGHT } from 'constants/header'

const makeStyles = () => {
  return (
    {
      banner: {
        height: `calc(90vh - ${HEADER_HEIGHT})`,
        width: '100%',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "80px",
        boxSizing: "border-box"
      },

    }
  )
}

export const useStyles = () => makeStyles()