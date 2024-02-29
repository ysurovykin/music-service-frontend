import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './user/login/login.page';
import { RegistrationPage } from './user/registration/registration.page';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import ListenerRouter from './listener/components/listener-router/listener.router';
import { PageLoaderComponent } from './listener/components/loader/page-loader';

export default function AppRouter() {

  const userId = useSelector(userSelectors.userId);
  const isAuthorizationLoading = useSelector(userSelectors.isAuthorizationLoading);
  const profileType = useSelector(userSelectors.profileType);

  const renderUnauthorizedRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    );
  };

  const renderAuthorizedRoutes = () => {
    return (
      <div className='router__wrapper'>
        <div className='router'>
          <ListenerRouter />
        </div>
      </div>
    );
  };

  return (
    <Router>
      {isAuthorizationLoading ? <PageLoaderComponent /> : userId ? renderAuthorizedRoutes() : renderUnauthorizedRoutes()}
    </Router>
  );
}