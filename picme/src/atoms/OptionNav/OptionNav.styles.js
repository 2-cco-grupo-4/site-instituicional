const makeStyles = (isHover) => {
  return (
    {
      opcoes: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 500,
        color: '#000000',
        height: '100%',
        padding: 16,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        borderBottom: isHover ? '2px solid #000000' : '2px solid #fff',
      },
    }
  )
}

export const useStyles = isHover => makeStyles(isHover)