import { makeStyles } from '@mui/styles'
import photo from "assets/img/photographer-cap.png"


export default makeStyles((theme) => ({

  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '68vh',
    backgroundColor: 'white',
    border: '0px solid #000',
    borderRadius: '2vh',
    boxShadow: 24,
    p: 4,
    backgroundImage: `url(${photo})`,
    backgroundSize: 'auto 140%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left'
  },


  textContainer: {
    
    width: '100%',
    height: '100%',
    alignItems: 'right',
    fontSize: '14px'
  
  },

  font:{
    color: theme.palette.white.main, 
    fontWeight: 700,
    // fontSize: '25px',
    
  }
    

  
  }

))

