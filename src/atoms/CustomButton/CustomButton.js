import useStyles from "./CustomButton.styles"
import { Button } from "@mui/material"


const CustomButton = ({ children, variant, onClick, color, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      type="button"
      className={classes.customBtn}
      onClick={onClick}
      variant={variant}
      color={color}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton 