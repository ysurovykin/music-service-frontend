import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetListenerTopAlbumsThisMonthRequest } from "../../album/store/album.model";
import { AlbumCardComponent } from "../../album/album-card/album-card.component";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
import { albumSelectors } from "../../album/store/album.selectors";
import { albumActions } from "../../album/store/album.actions";
const { Title } = Typography;

export function ListenerTopAlbumsPage() {
  const { ref: albumRef, inView: albumInView } = useInView({ threshold: 0 });

  const [search, setSearch] = useState<string>('');
  const [albumOffset, setAlbumOffset] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const topAlbumsThisMonth = useSelector(albumSelectors.topAlbumsThisMonth);
  const isMoreTopAlbumsThisMonthForLoading = useSelector(albumSelectors.isMoreTopAlbumsThisMonthForLoading);
  const istopAlbumsThisMonthLoading = useSelector(albumSelectors.isTopAlbumsThisMonthLoading);

  const dispatch = useDispatch()
  const getListenerTopAlbumsThisMonth = (request: GetListenerTopAlbumsThisMonthRequest) => dispatch(albumActions.getListenerTopAlbumsThisMonth(request));
  const loadMoreListenerTopAlbumsThisMonth = (request: GetListenerTopAlbumsThisMonthRequest) => dispatch(albumActions.loadMoreListenerTopAlbumsThisMonth(request));

  const handleLoadMoreAlbums = async () => {
    if (!istopAlbumsThisMonthLoading && (typeof isMoreTopAlbumsThisMonthForLoading === 'undefined' || isMoreTopAlbumsThisMonthForLoading)) {
      loadMoreListenerTopAlbumsThisMonth({
        offset: albumOffset,
        limit: 10,
        search: debouncedSearch
      });
      setAlbumOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getListenerTopAlbumsThisMonth({
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
    <div className='user-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="listener-top-albums-page user-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="listener-top-albums-page-wrapper">
          <Title className="mt-0" level={1}>Top albums this month</Title>
          <div className="listener-top-albums-page__content">
            {istopAlbumsThisMonthLoading && !topAlbumsThisMonth?.length ?
              <div className='listener-top-page__loader-wrapper'><Spin /></div> :
              topAlbumsThisMonth?.map((album, index) =>
                <AlbumCardComponent
                  showLikeButton={false}
                  showArtistInfo={true}
                  key={album.albumId}
                  album={album}
                  reference={((index === topAlbumsThisMonth?.length - 1) && isMoreTopAlbumsThisMonthForLoading) ? albumRef : null} />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};