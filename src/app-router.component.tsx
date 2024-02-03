import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './user/login/login.page';
import { RegistrationPage } from './user/registration/registration.page';
import { useSelector } from 'react-redux';
import { userSelectors } from './user/store/user.selectors';
import { MainPage } from './main.page';
import { ArtistPage } from './listener/artist/artist.page';
import { AlbumPage } from './listener/album/album.page';
import { SongPlayerComponent } from './listener/components/song-player.component';

export default function AppRouter() {

  const userId = useSelector(userSelectors.userId);
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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/artist/:artistId" element={<ArtistPage />} />
        <Route path="/artist/:artistId/album/:albumId" element={<AlbumPage />} />
      </Routes>
    );
  };

  return (
    <Router>
      { userId ? renderAuthorizedRoutes() : renderUnauthorizedRoutes() }
      { profileType === 'listener' && <SongPlayerComponent /> }
    </Router>
  );
}