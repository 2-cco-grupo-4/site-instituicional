import useStyles from "./CardChartEsq.styles"

const CardChartEsq = ( { conteudo } ) => {
  const classes = useStyles()

  return (
    <Box className={classes.caixa}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
    >

        {conteudo}

    </Box>
  )
}

export default CardChartEsq