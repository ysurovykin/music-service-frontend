import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { artistSelectors } from "../../artist/store/artist.selectors";
import { GetListenerTopArtistsThisMonthRequest } from "../../artist/store/artist.model";
import { artistActions } from "../../artist/store/artist.actions";
import { ArtistCardComponent } from "../../artist/artist-card/artist-card.component";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
const { Title } = Typography;

export function ListenerTopArtistsPage() {
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });

  const [search, setSearch] = useState<string>('');
  const [artistOffset, setArtistOffset] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const topArtistsThisMonth = useSelector(artistSelectors.topArtistsThisMonth);
  const isMoreTopArtistsThisMonthForLoading = useSelector(artistSelectors.isMoreTopArtistsThisMonthForLoading);
  const isTopArtistsThisMonthLoading = useSelector(artistSelectors.isTopArtistsThisMonthLoading);

  const dispatch = useDispatch()
  const getListenerTopArtistsThisMonth = (request: GetListenerTopArtistsThisMonthRequest) => dispatch(artistActions.getListenerTopArtistsThisMonth(request));
  const loadMoreListenerTopArtistsThisMonth = (request: GetListenerTopArtistsThisMonthRequest) => dispatch(artistActions.loadMoreListenerTopArtistsThisMonth(request));

  const handleLoadMoreArtists = async () => {
    if (!isTopArtistsThisMonthLoading && (typeof isMoreTopArtistsThisMonthForLoading === 'undefined' || isMoreTopArtistsThisMonthForLoading)) {
      loadMoreListenerTopArtistsThisMonth({
        offset: artistOffset,
        limit: 10,
        search: debouncedSearch
      });
      setArtistOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getListenerTopArtistsThisMonth({
      limit: 10,
      offset: 0,
      search: debouncedSearch
    });
    setArtistOffset(1);
  }, [debouncedSearch])

  useEffect(() => {
    if (artistInView) {
      handleLoadMoreArtists();
    }
  }, [artistInView]);

  const renderSearchInput = () => {
    return (
      <Input
        placeholder="Artist name"
        style={{ width: '300px', borderRadius: '50px' }}
        onChange={(event) => setSearch(event.target.value)}
        prefix={<Search className="search-page__search-icon" />}
        allowClear />
    );
  }

  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="listener-top-artists-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="listener-top-artists-page-wrapper">
          <Title className="mt-0" level={1}>Top artists this month</Title>
          <div className="listener-top-artists-page__content">
            {isTopArtistsThisMonthLoading && !topArtistsThisMonth?.length ?
              <div className='listener-top-page__loader-wrapper'><Spin /></div> :
              topArtistsThisMonth?.map((artist, index) =>
                <ArtistCardComponent
                  artist={artist}
                  key={artist.artistId}
                  reference={((index === topArtistsThisMonth?.length && isMoreTopArtistsThisMonthForLoading)) ? artistRef : null} />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};