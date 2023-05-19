import { Box } from "@mui/material"

const Container = ({children, ...props}) => (
    <Box 
    display="flex"
    width="100%"
    boxSizing="border-box"
    px={8}
    {...props}
    >
        {children}
    </Box>
)

export default Container