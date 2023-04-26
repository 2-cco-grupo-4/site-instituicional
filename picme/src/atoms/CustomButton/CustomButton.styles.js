const makeStyles = () => {
  return (
    {
      btn: {
        fontFamily: 'Inter, sans-serif',
        textTransform: 'none',
        paddingRight: 2,
        paddingLeft: 2,
        paddingTop: 0,
        paddingBottom: 0,        
        width: 'auto', 
        height: 'auto',
        whiteSpace: 'nowrap',
        borderRadius: 0.5,
      },
    }
  )
}

export const useStyles = () => makeStyles() 