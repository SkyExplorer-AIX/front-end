import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';
import getTokenDetails from './TokenDetails.tsx';

interface AuthRouteProps {
    path: string;
    element: ReactNode;
    roles?: string[];
}

const AuthRoute = ({ element, roles = [], ...rest }: AuthRouteProps): JSX.Element => {
    const tokenDetails = getTokenDetails();

    if (!tokenDetails) {
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(tokenDetails.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Route {...rest} element={element} />;
};

export default AuthRoute;