import React, {useEffect, useState} from 'react';
import {Sidebar, Menu, MenuItem, MenuItemStylesParams} from 'react-pro-sidebar';
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import {Link} from 'react-router-dom';
import {tokens} from '../../theme.tsx';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeIcon from '@mui/icons-material/Home';
import getTokenDetails from "../../auth/TokenDetails.tsx";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


interface ItemProps {
    icon: any;
    title: string;
    to: string;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({icon, title, to, selected, setSelected}: ItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            component={<Link to={to}/>}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function Sidebard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isSellected, setSelected] = useState('Table');

    const handleOnMouseLeave = () => {
        setIsCollapsed(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = getTokenDetails();
            setUserRole(decodedToken.role);
        } else {
            setUserRole("student")
        }
    }, []);

    return (
        <Box
            sx={{
                '& .ps-sidebar-container': {
                    height: '100vh ',
                    background: `${colors.primary[400]} !important`,
                },
            }}
            onMouseLeave={handleOnMouseLeave}
        >

            <Sidebar
                collapsed={isCollapsed}
                backgroundColor={hexToRgba(colors.primary[400], 0.9)}
                style={{

                }}
            >
                <Menu menuItemStyles={
                    {
                        root: ({active}: MenuItemStylesParams) => ({
                            backgroundColor: active ? colors.grey[300] : 'transparent',
                            color: colors.grey[300],
                            '&:hover': {
                                backgroundColor: colors.grey[300],
                            },
                            '&:focus': {
                                backgroundColor: colors.grey[300],
                            },
                        }),
                        label: () => ({
                            color: colors.grey[100],
                        }),
                        icon: () => ({
                            color: colors.grey[100],
                        }),
                        button: () => ({
                            '&:hover': {
                                backgroundColor: colors.grey[600],
                            },
                        }),
                        subMenuContent: ({level}: MenuItemStylesParams) => ({
                            background: `${colors.primary[400]} !important`,
                            '&:hover': {
                                backgroundColor:
                                    level === 0
                                        ? hexToRgba(colors.blueAccent[300], 1)
                                        : 'transparent',
                            },
                        }),
                    }
                }>

                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="cam-cgm logo"
                                    width="100px"
                                    height="100px"
                                    src={`/GroupLogo-sky_bleu.svg`}
                                    style={{cursor: 'pointer', borderRadius: '5%'}}
                                />
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : '10%'} paddingRight={isCollapsed ? undefined : '10%'}>

                        <Item title={'Accueil'} to={'/'} icon={<HomeIcon/>} selected={isSellected}
                              setSelected={setSelected}/>
                        <Item title={'Calendrier'} to={'/calendar'} icon={<CalendarMonthIcon/>} selected={isSellected}
                              setSelected={setSelected}/>
                        {userRole === "admin" &&
                            <Item title={'Utilisateurs'} to={'/users'} icon={<PeopleOutlineIcon/>}
                                  selected={isSellected}
                                  setSelected={setSelected}/>}
                        <Item title={'Statistiques'} to={'/charts'} icon={<AutoGraphIcon/>} selected={isSellected}
                              setSelected={setSelected}/>
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
}

export default Sidebard;