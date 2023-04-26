import { useState } from "react"
import { useStyles } from "./OptionNav.styles"

const OptionNav = ({title, navigation}) => {
  const [isHover, setIsHover] = useState(false)

  const classes = useStyles(isHover)

  return (
    <a style={classes.opcoes} 
    onMouseEnter={() => setIsHover(!isHover)} 
    onMouseLeave={() => setIsHover(!isHover)} 
    href={navigation}
    >
      {title}
    </a>
  )
}

export default OptionNav