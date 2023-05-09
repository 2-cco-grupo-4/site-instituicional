const makeStyles = () => {
  return (
    {
      btn: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        textTransform: 'none',
        paddingRight: 2,
        paddingLeft: 2,
        paddingTop: 0,
        paddingBottom: 0,        
        width: 'fit-content', 
        height: 32,
        whiteSpace: 'nowrap',
        borderRadius: 0.5,
      },
    }
  )
}

export const useStyles = () => makeStyles() 