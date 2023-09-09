import { Box } from "@mui/material"

const Container = ({children, ...props}) => (
    <Box 
    display="flex"
    width="100%"
    boxSizing="border-box"
    px={{lg: 8, md: 8, sm: 4, xs: 3}}
    {...props}
    >
        {children}
    </Box>
)

export default Container