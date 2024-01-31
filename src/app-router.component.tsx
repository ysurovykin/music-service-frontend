import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './user/login/login.page';
import { RegistrationPage } from './user/registration/registration.page';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import { MainPage } from './main.page';

export default function AppRouter() {

  const userId = useSelector(userSelectors.userId);

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
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    );
  };

  return (
    <Router>
      { userId ? renderAuthorizedRoutes() : renderUnauthorizedRoutes() }
    </Router>
  );
}