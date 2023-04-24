import { useState } from "react"
import { useStyles } from "./OptionNav.styles"

const OptionNav = ({title, navigation}) => {
  const [isHover, setIsHover] = useState(false)

  const classes = useStyles(isHover)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <a style={classes.opcoes} 
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave} 
    href={navigation}
    >
      {title}
    </a>
  )
}

export default OptionNav