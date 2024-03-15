import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { albumSelectors } from "../../album/store/album.selectors";
import { albumActions } from "../../album/store/album.actions";
import { GetAlbumsInListenerLibraryRequest } from "../../album/store/album.model";
import { AlbumCardComponent } from "../../album/album-card/album-card.component";
const { Title } = Typography;

export function LibraryAlbumsPage() {
  const { ref, inView } = useInView({ threshold: 1 });
  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });

  const [albumOffset, setArtistOffset] = useState<number>(0);

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
        limit: 10
      });
      setArtistOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getAlbumsInListenerLibrary({
      limit: 10,
      offset: 0
    });
    setArtistOffset(state => state + 1);
  }, [])

  useEffect(() => {
    if (albumInView) {
      handleLoadMoreAlbums();
    }
  }, [albumInView]);

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-albums-page listener-group-page">
        <HeaderComponent text="Liked Albums" showHeader={!inView} />
        <div className="library-albums-page-wrapper">
          <Title ref={ref} className="mt-0" level={1}>Liked Albums</Title>
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