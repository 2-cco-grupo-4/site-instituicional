import useStyles from "./CardChartDir.styles"
import { Box } from "@mui/material"

const CardChartDir = () => {
  const classes = useStyles()

  return (
    <Box className={classes.caixa}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
    >

    </Box>
  )
}

export default CardChartDir