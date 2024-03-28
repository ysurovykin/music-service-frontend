import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { albumSelectors } from "../../album/store/album.selectors";
import { albumActions } from "../../album/store/album.actions";
import { GetAlbumsInListenerLibraryRequest } from "../../album/store/album.model";
import { AlbumCardComponent } from "../../album/album-card/album-card.component";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
const { Title } = Typography;

export function LibraryAlbumsPage() {
  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });

  const [search, setSearch] = useState<string>('');
  const [albumOffset, setAlbumOffset] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const likedAlbums = useSelector(albumSelectors.likedAlbums);
  const isMoreLikedAlbumsForLoading = useSelector(albumSelectors.isMoreLikedAlbumsForLoading);
  const isLikedAlbumsLoading = useSelector(albumSelectors.isLikedAlbumsLoading);

  const dispatch = useDispatch()
  const getAlbumsInListenerLibrary = (request: GetAlbumsInListenerLibraryRequest) => dispatch(albumActions.getAlbumsInListenerLibrary(request));
  const loadMoreAlbumsInListenerLibrary = (request: GetAlbumsInListenerLibraryRequest) => dispatch(albumActions.loadMoreAlbumsInListenerLibrary(request));

  const handleLoadMoreAlbums = async () => {
    if (!isLikedAlbumsLoading && (typeof isMoreLikedAlbumsForLoading === 'undefined' || isMoreLikedAlbumsForLoading)) {
      loadMoreAlbumsInListenerLibrary({
        offset: albumOffset,
        limit: 10,
        search: debouncedSearch
      });
      setAlbumOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getAlbumsInListenerLibrary({
      search: debouncedSearch,
      limit: 10,
      offset: 0
    });
    setAlbumOffset(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (albumInView) {
      handleLoadMoreAlbums();
    }
  }, [albumInView]);

  const renderSearchInput = () => {
    return (
      <Input
        placeholder="Album name"
        style={{ width: '300px', borderRadius: '50px' }}
        onChange={(event) => setSearch(event.target.value)}
        prefix={<Search className="search-page__search-icon" />}
        allowClear />
    );
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-albums-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="library-albums-page-wrapper">
          <Title className="mt-0" level={1}>Liked Albums</Title>
          <div className="library-albums-page__content">
            {isLikedAlbumsLoading && !likedAlbums?.length ?
              <div className='library-page__loader-wrapper'><Spin /></div> :
              likedAlbums?.map((album, index) =>
                <AlbumCardComponent
                  showLikeButton={false}
                  showArtistInfo={true}
                  key={album.albumId}
                  album={album}
                  reference={((index === likedAlbums?.length - 1) && isMoreLikedAlbumsForLoading) ? albumRef : null} />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};