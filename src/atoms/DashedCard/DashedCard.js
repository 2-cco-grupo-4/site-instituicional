import { Stack } from "@mui/material"
import useStyles from "./DashedCard.styles"

const DashedCard = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Stack className={classes.card} {...props}>{children}</Stack>
  )
}

export default DashedCard