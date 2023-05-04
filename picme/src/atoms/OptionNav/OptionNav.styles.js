const makeStyles = (isHover) => {
  return (
    {
      opcoes: {
        color: '#000000',
        height: `100%`,
        padding: 16,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        cursor: 'pointer',
        borderBottom: isHover ? '2px solid #282828' : '2px solid rgba(0,0,0,0)',
      },
    }
  )
}

export const useStyles = (isHover) => makeStyles(isHover)