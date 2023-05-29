import useStyles from "./OptionNav.styles"

const OptionNav = ({title, navigation}) => {
  const classes = useStyles()

  return (
    <a className={classes.opcoes} 
    href={navigation}
    >
      {title}
    </a>
  )
}

export default OptionNav