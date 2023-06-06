import useStyles from "./CustomButton.styles"
import { Button, CircularProgress } from "@mui/material"


const CustomButton = ({ children, variant, onClick, color, loading, ...props }) => {
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
      {loading ? <CircularProgress size={18} thickness={4} /> : <>{children}</>}
    </Button>
  )
}

export default CustomButton 