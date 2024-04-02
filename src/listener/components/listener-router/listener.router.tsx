import { Routes, Route } from 'react-router-dom';
import { SongPlayerComponent } from '../song-player/song-player.component';
import { ArtistPage } from '../../artist/artist.page';
import { AlbumPage } from '../../album/album.page';
import { QueuePage } from '../../queue/queue.page';
import { HomePage } from '../../home.page';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PlaylistPage } from '../../playlist/playlist.page';
import { EditSongPlaylistsModal } from '../../playlist/edit-song-playlists-modal/edit-song-playlists.modal';
import { LyricsPage } from '../../lyrics/lyrics.page';
import { SearchPage } from '../../search/search.page';
import { ProfilePage } from '../../profile/profile.page';
import { LibraryPage } from '../../library/library.page';
import { CreatePlaylistModal } from '../../playlist/create-playlist-modal/create-playlist.modal';
import { EditPlaylistModal } from '../../playlist/edit-playlist-modal/edit-playlist.modal';
import { ArtistSongsPage } from '../../artist/artist-songs/artist-songs.page';
import { ArtistLikedSongsPage } from '../../artist/artist-liked-songs/artist-liked-songs.page';
import { DiscoverArtistModal } from '../../artist/discover-artist-modal/discover-artist.modal';
import { LibraryPlaylistsPage } from '../../library/library-playlists/library-playlists.page';
import { LibraryArtistsPage } from '../../library/library-artists/library-artists.page';
import { LibraryAlbumsPage } from '../../library/library-albums/library-albums.page';
import { LibraryListenerSongRadiosPage } from '../../library/library-listener-song-radios/library-listener-song-radios.page';
import { SongRadioPage } from '../../song-radio/song-radio.page';
import { RefreshSongRadioModal } from '../../song-radio/refresh-song-radio-modal/refresh-song-radio.modal';

export default function ListenerRouter() {
  return (
    <>
      <SidebarComponent />
      <div className='listener-router'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/artist/all-songs/:artistId" element={<ArtistSongsPage />} />
          <Route path="/artist/liked-songs/:artistId" element={<ArtistLikedSongsPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/playlists" element={<LibraryPlaylistsPage />} />
          <Route path="/library/artists" element={<LibraryArtistsPage />} />
          <Route path="/library/albums" element={<LibraryAlbumsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/lyrics" element={<LyricsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/library/song-radios" element={<LibraryListenerSongRadiosPage />} />
          <Route path="/song-radio/:songId" element={<SongRadioPage />} />
        </Routes>
      </div>
      <SongPlayerComponent />
      <EditPlaylistModal />
      <EditSongPlaylistsModal />
      <CreatePlaylistModal />
      <DiscoverArtistModal />
      <RefreshSongRadioModal />
    </>
  );
}