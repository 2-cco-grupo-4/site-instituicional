import { Button, LinearProgress, Modal, Stack, useTheme } from "@mui/material"
import useStyles from "./CustomModal.styles"

import CloseIcon from "@mui/icons-material/Close"
import CustomButton from "atoms/CustomButton"

const CustomModal = ({
  open,
  setOpen,
  header,
  children,
  onSubmit,
  leftButtonText,
  leftButtonProps = {},
  rightButtonText,
  rightButtonProps = {},
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: "scroll", height: "100%" }}
    >
      <Stack
        component={onSubmit && "form"}
        onSubmit={onSubmit}
        className={classes.modal}
      >
        <Stack mb={4} className={classes.modalHeader}>
          <Button
            variant="outlined"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <Stack className={classes.textContainer}>{header}</Stack>
        </Stack>
        <Stack mb={10}>{children}</Stack>
        {rightButtonText && (
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              position: "absolute",
              bottom: theme.spacing(2),
              right: theme.spacing(4),
            }}
            type={onSubmit && "submit"}
            {...rightButtonProps}
          >
            {rightButtonText}
          </CustomButton>
        )}
        {leftButtonText && (
          <CustomButton
            variant="outlined"
            color="secondary"
            sx={{
              position: "absolute",
              bottom: theme.spacing(2),
              left: theme.spacing(4),
            }}
            {...leftButtonProps}
          >
            {leftButtonText}
          </CustomButton>
        )}
      </Stack>
    </Modal>
  )
}

export default CustomModal
