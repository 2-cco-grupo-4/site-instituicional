import { useStyles } from "./CustomButton.styles"
import { Button } from "@mui/material"


const CustomButton = ({ children, variant, onClick, color, sx }) => {
  const classes = useStyles()

  return (
    <Button 
    type="button" 
    onClick={onClick} 
    variant={variant}
    color={color}
    sx={{...classes.btn, ...sx}}
    >
      {children}
    </Button>
  )
}

export default CustomButton 