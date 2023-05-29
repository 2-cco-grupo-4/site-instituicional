import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
  tapes: {
    position: 'absolute',
    zIndex: '10',
    top: '-5%',
    width: '100%',
    display: 'flex',
    justifyContent: "space-between",
    '& img': {
      position: 'absolute',
      width: '25%',
      '&:first-child': {
        transform: 'rotate(90deg)',
        left: '-6%',
      },
      '&:last-child': {
        right: '-6%',
      }
    }
  },
  polaroid: {
    padding: theme.spacing(2, 2, 6, 2),
    backgroundColor: "#F2F2F2",
    boxShadow: '0px 2px 8px rgba(0,0,0,.2)',
    '& img': {
      boxShadow: 'inset 0px 8px 8px rgba(0,0,0,.2)',
      filter: 'contrast(130%)',
      objectFit: 'cover',
      width: '100%',
      height: 400,
    }
  }
}))