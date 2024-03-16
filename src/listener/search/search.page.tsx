import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../components/header/header.component";
import { getBackground } from "../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Radio, Spin, Typography } from "antd";
import { Search } from "@mui/icons-material";
import { useDebounce } from "use-debounce";
import { SongTableComponent } from "../components/song-table/song-table.component";
import { useDispatch } from "react-redux";
import { ArtistInfoResponseData, GetArtistsRequest } from "../artist/store/artist.model";
import { artistActions } from "../artist/store/artist.actions";
import { useSelector } from "react-redux";
import { artistSelectors } from "../artist/store/artist.selectors";
import { ArtistCardComponent } from "../artist/artist-card/artist-card.component";
import { albumSelectors } from "../album/store/album.selectors";
import { albumActions } from "../album/store/album.actions";
import { AlbumCardComponent } from "../album/album-card/album-card.component";
import { AlbumInfoResponseData } from "../album/store/album.model";

const { Title } = Typography;

export function SearchPage() {
  const [search, setSearch] = useState<string>('');
  const [searchSource, setSearchSource] = useState<'song' | 'artist' | 'album'>('song');
  const [albumOffset, setAlbumOffset] = useState<number>(0);
  const [artistOffset, setArtistOffset] = useState<number>(0);
  const [recentSearch, setRecentSearch] = useState<Array<any>>(JSON.parse(localStorage.getItem('recentSearch') || '[]'));

  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });
  const [debouncedSearch] = useDebounce(search, 500);

  const artists = useSelector(artistSelectors.artists);
  const isArtistsLoading = useSelector(artistSelectors.isArtistsLoading);
  const isMoreArtistsForLoading = useSelector(artistSelectors.isMoreArtistsForLoading);
  const albums = useSelector(albumSelectors.albums);
  const isAlbumsLoading = useSelector(albumSelectors.isAlbumsLoading);
  const isMoreAlbumsForLoading = useSelector(albumSelectors.isMoreAlbumsForLoading);

  const dispatch = useDispatch();
  const getArtists = (request: GetArtistsRequest) => dispatch(artistActions.getArtists(request));
  const loadMoreArtists = (request: GetArtistsRequest) => dispatch(artistActions.loadMoreArtists(request));
  const getAlbums = (request: GetArtistsRequest) => dispatch(albumActions.getAlbums(request));
  const loadMoreAlbums = (request: GetArtistsRequest) => dispatch(albumActions.loadMoreAlbums(request));

  const handleLoadMoreArtists = async () => {
    if (!isArtistsLoading && (typeof isMoreArtistsForLoading === 'undefined' || isMoreArtistsForLoading)) {
      loadMoreArtists({
        offset: artistOffset,
        limit: 20
      });
      setArtistOffset(state => state + 1);
    }
  };

  const handleLoadMoreAlbums = async () => {
    if (!isAlbumsLoading && (typeof isMoreAlbumsForLoading === 'undefined' || isMoreAlbumsForLoading)) {
      loadMoreAlbums({
        offset: albumOffset,
        limit: 20
      });
      setAlbumOffset(state => state + 1);
    }
  };

  useEffect(() => {
    if (artistInView) {
      handleLoadMoreArtists();
    }
  }, [artistInView]);

  useEffect(() => {
    if (albumInView) {
      handleLoadMoreAlbums();
    }
  }, [albumInView]);

  useEffect(() => {
    if (debouncedSearch) {
      if (searchSource === 'artist') {
        getArtists({
          search: debouncedSearch,
          limit: 20,
          offset: 0
        });
        setArtistOffset(1);
      } else if (searchSource === 'album') {
        getAlbums({
          search: debouncedSearch,
          limit: 20,
          offset: 0
        });
        setAlbumOffset(1);
      }
    }
  }, [searchSource, debouncedSearch]);

  const renderSearchInput = () => {
    return (
      <Input
        placeholder="Search"
        style={{ width: '300px', borderRadius: '50px' }}
        onChange={(event) => setSearch(event.target.value)}
        prefix={<Search className="search-page__search-icon" />}
        allowClear />
    );
  }

  const renderSearchOptions = () => {
    return (
      <div className="search-page__options">
        <div
          className={`search-page__option ${searchSource === 'song' ? 'search-page__active-option' : 'search-page__disabled-option'}`}
          onClick={() => setSearchSource('song')}>
          Song
        </div>
        <div
          className={`search-page__option ${searchSource === 'artist' ? 'search-page__active-option' : 'search-page__disabled-option'}`}
          onClick={() => setSearchSource('artist')}>
          Artist
        </div>
        <div
          className={`search-page__option ${searchSource === 'album' ? 'search-page__active-option' : 'search-page__disabled-option'}`}
          onClick={() => setSearchSource('album')}>
          Album
        </div>
      </div>
    );
  }

  const addNewRecentSearchItem = (newItem: any, type: 'album' | 'artist') => {
    const currentRecentSearch = JSON.parse(localStorage.getItem('recentSearch') || '[]');
    const itemToAdd = structuredClone(newItem);
    if (type === 'album') {
      itemToAdd.isAlbum = true;
    } else if (type === 'artist') {
      itemToAdd.isArtist = true;
    }
    const updatedRecentSearch = [itemToAdd, ...currentRecentSearch];
    setRecentSearch(updatedRecentSearch);
    localStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
  }

  const clearRecentSearch = () => {
    setRecentSearch([]);
    localStorage.removeItem('recentSearch');
  }

  const removeRecentSearchItem = (newItem: any, type: 'album' | 'artist') => {
    const currentRecentSearch = JSON.parse(localStorage.getItem('recentSearch') || '[]');
    if (type === 'album') {
      const updatedRecentSearch = currentRecentSearch.filter((album: AlbumInfoResponseData) => album.albumId !== newItem.albumId);
      setRecentSearch(updatedRecentSearch);
      localStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
    } else if (type === 'artist') {
      const updatedRecentSearch = currentRecentSearch.filter((artist: ArtistInfoResponseData) => artist.artistId !== newItem.artistId);
      setRecentSearch(updatedRecentSearch);
      localStorage.setItem('recentSearch', JSON.stringify(updatedRecentSearch));
    }
  }

  const renderRecentSearch = () => {
    return (
      <div>
        <div className="search-page__content">
          {recentSearch?.map((item: any) => {
            if (item.isArtist) {
              return <ArtistCardComponent
                key={item.artistId + 'recent'}
                showArtistTag={true}
                artist={item}
                onCancelFunction={() => removeRecentSearchItem(item, 'artist')}
                showCancelButton={true} />
            } else if (item.isAlbum) {
              return <AlbumCardComponent
                key={item.albumId + 'recent'}
                album={item}
                showYear={false}
                showLikeButton={false}
                showArtistInfo={true}
                onCancelFunction={() => removeRecentSearchItem(item, 'album')}
                showCancelButton={true} />
            }
          })}
        </div>
      </div>
    );
  }

  const renderSongs = () => {
    return (
      <SongTableComponent search={debouncedSearch} offsetHeader={100} />
    )
  }

  const renderArtists = () => {
    return (
      <div>
        <div className="search-page__content">
          {isArtistsLoading && !artists?.length ?
            <div className='search-page__loader-wrapper'><Spin /></div> :
            artists?.map((artist, index) => <ArtistCardComponent
              key={artist.artistId}
              artist={artist}
              onClickFunction={() => addNewRecentSearchItem(artist, 'artist')}
              reference={((index === artists?.length && isMoreArtistsForLoading)) ? artistRef : null} />)
          }
        </div>
      </div>
    )
  }

  const renderAlbums = () => {
    return (
      <div>
        <div className="search-page__content">
          {isAlbumsLoading && !albums?.length ?
            <div className='search-page__loader-wrapper'><Spin /></div> :
            albums?.map((album, index) => <AlbumCardComponent
              key={album.albumId}
              album={album}
              showLikeButton={false}
              showArtistInfo={true}
              onClickFunction={() => addNewRecentSearchItem(album, 'album')}
              reference={((index === albums?.length && isMoreAlbumsForLoading)) ? albumRef : null} />)
          }
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (searchSource === 'song') {
      return renderSongs();
    } else if (searchSource === 'artist') {
      return renderArtists();
    } else if (searchSource === 'album') {
      return renderAlbums();
    }
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="search-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()}
          secondRow={search ? renderSearchOptions() : null} />
        {search ?
          <div className={`search-page-wrapper${searchSource === 'song' ? '--song' : ''}`}>
            {renderContent()}
          </div> :
          <div className={'search-page-wrapper'}>
            {!!recentSearch?.length ?
              <div>
                <div className="search-page__recent-search-title">
                  <Title
                    level={3}>
                    Recent Searches
                  </Title>
                  <Title
                    className="search-page__clear-recent-search"
                    style={{ color: 'gray' }}
                    onClick={() => clearRecentSearch()}
                    level={5}>
                    Clear
                  </Title>
                </div>
                {renderRecentSearch()}
              </div> :
              <div className="search-page__no-search">
                <Title
                  className="m-0"
                  level={1}>
                  There is no recent searches
                </Title>
                <Title
                  className="m-0"
                  level={3}>
                  Start searching somethings
                </Title>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
};