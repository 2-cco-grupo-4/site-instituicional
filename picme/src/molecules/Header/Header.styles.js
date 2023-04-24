const makeStyles = () => {
  return (
    {
      navbar: {
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 48,
        paddingRight: 48,
        alignItems: 'center',
        boxShadow: '0 1px 16px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
      },
      navbarNav: {
        width: '30vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logo: {
        height: 24,
        width: 'auto',
        padding: '8px 0px',
      },
      menu: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: ' space-between',
      },
      btnLogin: {
        marginRight: 16, 
      },
      navBotoes: {
        display: 'flex',
        flexDirection: 'row',
      },
    }
  )
}

export const useStyles = () => makeStyles()