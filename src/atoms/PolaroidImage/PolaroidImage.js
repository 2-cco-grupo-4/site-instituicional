import useStyles from "./PolaroidImage.styles"

import tape from 'assets/img/tape.png'
import { Box } from "@mui/material"
import { useEffect, useState } from "react"

const PolaroidImage = ({children, tilt, hasTapes, ...props}) => {
  const classes = useStyles()
  const [tiltDeg, setTiltDeg] = useState(0)

  useEffect(() => {
    if(tilt){
      setTiltDeg(tilt === 'left' ? -2 : 2) 
    }
  },[tilt])

  return (
    <Box 
    position="relative" 
    alignItems="center" 
    width="100%"
    zIndex={1} 
    sx={{
      transform: `rotate(${tiltDeg}deg)`,
    }}
    {...props}
    >
      {hasTapes && (
        <Box className={classes.tapes}>
          <img src={tape} alt="" />
          <img src={tape} alt="" />
        </Box>
      )}
      <Box className={classes.polaroid}>
        {children}
      </Box>
    </Box>
  )
}

export default PolaroidImage