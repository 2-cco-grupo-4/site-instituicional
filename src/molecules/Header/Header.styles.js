import { makeStyles } from '@mui/styles'

export default makeStyles(() => ({
  navbar: {
    backgroundColor: 'white.main',
    boxShadow: '0 1px 16px rgba(0,0,0,0.2)',
  },
  navbarNav: {
    width: '30%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBotoes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))