import { makeStyles } from "@mui/styles"

export default makeStyles(() => ({
  opcoes: {
    color: '#000000',
    height: `100%`,
    padding: 16,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    cursor: 'pointer',
    borderBottom: '2px solid rgba(0,0,0,0)',
    "&:hover": {
      borderBottom: '2px solid #282828',
    }
  },
}))
