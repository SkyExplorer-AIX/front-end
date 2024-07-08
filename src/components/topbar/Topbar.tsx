import {Box, IconButton, useTheme} from '@mui/material';
import {useContext} from 'react';
import {ColorModeContext, tokens} from '../../theme.tsx';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/SearchOutlined';

function Topbar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const disconnectUser = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* Search bar */}
            <Box display="flex" sx={{backgroundColor: colors.primary[400], borderRadius: "3px"}}>
                <InputBase sx={{ml: 2, flex: 1}} placeholder={'Recherche'}/>
                <IconButton type="button" sx={{p: 1}}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/* Color mode switch */}
            <Box display="flex">
                <IconButton onClick={disconnectUser}>
                    <PowerSettingsNewIcon/>
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/>}
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;