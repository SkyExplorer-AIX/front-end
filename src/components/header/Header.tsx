import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme.tsx';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: any;
}

function Header({title, subtitle, icon}: HeaderProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box display="flex">
        {icon}
        <Typography variant="h4" color={colors.grey[100]} sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h6" color={colors.grey[100]}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;