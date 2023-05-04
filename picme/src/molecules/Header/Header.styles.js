const makeStyles = () => {
  return (
    {
      navbar: {
        backgroundColor: '#fff',
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
      navBotoes: {
        display: 'flex',
        flexDirection: 'row',
      },
    }
  )
}

export const useStyles = () => makeStyles()