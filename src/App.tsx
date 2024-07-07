import {ColorModeContext, Mode, useMode} from './theme.tsx';
import {CssBaseline, Theme, ThemeProvider} from '@mui/material';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Topbar from './components/topbar/Topbar.tsx';
import Sidebard from './components/sidebar/Sidebard.tsx';
import NotFound from './pages/notfound/NotFound.tsx';
import {useEffect, useState} from "react";
import getTokenDetails from "./auth/TokenDetails.tsx";
import Login from "./pages/login/Login.tsx";

function App() {
    const navigate = useNavigate();
    const [theme, colorMode] = useMode();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = getTokenDetails();
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setUserRole(decodedToken.role);
                setIsAuthenticated(true);
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <ColorModeContext.Provider value={colorMode as { mode: Mode, toggleColorMode: () => void }}>
            <ThemeProvider theme={theme as Theme}>
                <CssBaseline/>
                <div className={'app'}>
                    {isAuthenticated ? <Sidebard/> : null}
                    <main className={'content'}>
                        {isAuthenticated ? <Topbar/> : null}
                        <Routes>
                            <Route path="/" element={userRole === 'admin' ? <NotFound/> : <NotFound/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/unauthorized" element={<NotFound/>}/>
                            <Route path="/charts" element={<NotFound/>}/>
                            <Route path="/tables/dataprovider/generic" element={<NotFound/>}/>
                            <Route path="/charts" element={<NotFound/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;