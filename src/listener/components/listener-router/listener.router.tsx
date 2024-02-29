import { Routes, Route } from 'react-router-dom';
import { SongPlayerComponent } from '../song-player/song-player.component';
import { ArtistPage } from '../../artist/artist.page';
import { AlbumPage } from '../../album/album.page';
import { QueuePage } from '../../queue/queue.page';
import { ListenerPage } from '../../listener.page';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlaylistPage } from '../../playlist/playlist.page';
import { EditPlaylistModal } from '../../song/edit-playlists-modal/edit-playlists.modal';
import { LyricsPage } from '../../lyrics/lyrics.page';
import { SearchPage } from '../../search/search.page';
import { ProfilePage } from '../../profile/profile.page';
import { LibraryPage } from '../../library/library.page';

export default function ListenerRouter() {
  return (
    <>
      <SidebarComponent />
      <div className='listener-router'>
        <Routes>
          <Route path="/" element={<ListenerPage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/lyrics" element={<LyricsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <SongPlayerComponent />
      <EditPlaylistModal />
    </>
  );
}58