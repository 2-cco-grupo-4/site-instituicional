import { useStyles } from "./Button.styles"


const Button = ({ title, style, onClick, color }) => {
  const classes = useStyles(color)

  return (
    <button 
    type="button" 
    onClick={onClick} 
    style={{...classes.btnMenu, ...style}}
    >
      {title}
    </button>
  )
}

export default Button