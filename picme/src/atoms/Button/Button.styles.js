const makeStyles = (color) => {
  return (
    {
      btnMenu: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        padding: '4px 16px',
        width: 'auto', 
        height: 'auto',
        whiteSpace: 'nowrap',
        borderRadius: 4,
        border: color === 'primary' ? 0 : '1px solid #000',
        backgroundColor: color === 'primary' ? 'var(--azulSite)' : 'rgb(0,0,0,0)', 
        color: color === 'primary' ? '#fff' : '#000',
      },
    }
  )
}

export const useStyles = color => makeStyles(color) 