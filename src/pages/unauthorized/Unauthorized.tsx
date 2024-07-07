import {Box, Typography} from "@mui/material";

export default function Unauthorized() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            height="100%"
        >
            <Typography variant="h1" color="secondary">
                401
            </Typography>
            <Typography variant="h2" color="secondary">
                Unauthorized
            </Typography>
        </Box>
    );
}