import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Typography variant="h1" color="secondary">
        404
      </Typography>
      <Typography variant="h2" color="secondary">
        Page not found
      </Typography>
    </Box>
  );
}

export default NotFound;