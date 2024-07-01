import { ColorModeContext, Mode, useMode } from './theme.tsx';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { Routes } from 'react-router-dom';
import Topbar from './components/topbar/Topbar.tsx';
import Sidebard from './components/sidebar/Sidebard.tsx';
import NotFound from './pages/notfound/NotFound.tsx';
import AuthRoute from './auth/AuthRoute.tsx';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode as { mode: Mode, toggleColorMode: () => void }}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <div className={'app'}>
          <Sidebard />
          <main className={'content'}>
            <Topbar />
            <Routes>
              <AuthRoute path="/" element={<Dashboard />} roles={['admin', 'user']}/>
              <AuthRoute path="/login" element={<LoginPage />} />
              <AuthRoute path="/unauthorized" element={<UnauthorizedPage />} />
              <AuthRoute path="/charts" element={<EagleTable />} />
              <AuthRoute path="/tables/dataprovider/generic" element={<GenericTable />} />
              <AuthRoute path="/charts" element={<EagleTable />} />
              <AuthRoute path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;