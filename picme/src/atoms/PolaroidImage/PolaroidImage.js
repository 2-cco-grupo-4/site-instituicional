import useStyles from "./PolaroidImage.styles"

import tape from 'assets/img/tape.png'

const PolaroidImage = () => {
  const classes = useStyles()

  return (
    <>
      <img className={imgTapeLeft} src={tape} />
      <img className={imgTapeRight} src={tape} />
      <img class="img-promocional img-promocional-1" src="assets/img/usuario-smartphone.jpg" />    
    </>
  )
}

export default PolaroidImage