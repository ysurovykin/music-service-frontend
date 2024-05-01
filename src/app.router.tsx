import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import ListenerRouter from './listener/components/listener-router/listener.router';
import { PageLoaderComponent } from './listener/components/loader/page-loader';
import UnauthorizedRouter from './user/unauthorized-router/unauthorized.router';
import ArtistProfileRouter from './artist/components/artist-router/artist.router';

export default function AppRouter() {

  const userId = useSelector(userSelectors.userId);
  const isAuthorizationLoading = useSelector(userSelectors.isAuthorizationLoading);
  const profileType = useSelector(userSelectors.profileType);

  const renderUnauthorizedRoutes = () => {
    return (
      <UnauthorizedRouter />
    );
  };

  const renderAuthorizedRoutes = () => {
    return (
      <div className='router__wrapper'>
        <div className='router'>
          {profileType === 'artist' ?
            <ArtistProfileRouter /> :
            <ListenerRouter />}
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