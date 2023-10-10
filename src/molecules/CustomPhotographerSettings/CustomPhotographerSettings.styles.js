import { makeStyles } from '@mui/styles'


export default makeStyles((theme) => ({

  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '38vw',
    height: '88vh',
    backgroundColor: 'white',
    border: '0px solid #000',
    borderRadius: '1vh',
    boxShadow: 24,
    p: 4,
  },


  textContainer: {

    width: '100%',
    height: '100%',
    alignItems: 'right',
    fontSize: '14px'

  },

  font: {
    color: theme.palette.white.main,
    fontWeight: 700,
    // fontSize: '25px',

  }



}

))