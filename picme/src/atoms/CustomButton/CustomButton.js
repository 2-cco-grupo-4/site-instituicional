import useStyles from "./CustomButton.styles"
import { Button } from "@mui/material"


const CustomButton = ({ children, variant, onClick, color, ...props }) => {
  const classes = useStyles()

  return (
    <Button 
    type="button" 
    onClick={onClick} 
    variant={variant}
    color={color}
    className={classes.btn}
    {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton 