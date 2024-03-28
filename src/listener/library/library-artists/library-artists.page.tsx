import React, { useEffect, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { Input, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { artistSelectors } from "../../artist/store/artist.selectors";
import { GetArtistsInListenerLibraryRequest } from "../../artist/store/artist.model";
import { artistActions } from "../../artist/store/artist.actions";
import { ArtistCardComponent } from "../../artist/artist-card/artist-card.component";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
const { Title } = Typography;

export function LibraryArtistsPage() {
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });

  const [search, setSearch] = useState<string>('');
  const [artistOffset, setArtistOffset] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const followedArtists = useSelector(artistSelectors.followedArtists);
  const isMoreFollowedArtistsForLoading = useSelector(artistSelectors.isMoreFollowedArtistsForLoading);
  const isFollowedArtistsLoading = useSelector(artistSelectors.isFollowedArtistsLoading);

  const dispatch = useDispatch()
  const getArtistsInListenerLibrary = (request: GetArtistsInListenerLibraryRequest) => dispatch(artistActions.getArtistsInListenerLibrary(request));
  const loadMoreArtistsInListenerLibrary = (request: GetArtistsInListenerLibraryRequest) => dispatch(artistActions.loadMoreArtistsInListenerLibrary(request));

  const handleLoadMoreArtists = async () => {
    if (!isFollowedArtistsLoading && (typeof isMoreFollowedArtistsForLoading === 'undefined' || isMoreFollowedArtistsForLoading)) {
      loadMoreArtistsInListenerLibrary({
        offset: artistOffset,
        limit: 10,
        search: debouncedSearch
      });
      setArtistOffset(state => state + 1);
    }
  };

  useEffect(() => {
    getArtistsInListenerLibrary({
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
      <div style={{ background: getBackground() }} className="library-artists-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="library-artists-page-wrapper">
          <Title className="mt-0" level={1}>Followed Artists</Title>
          <div className="library-artists-page__content">
            {isFollowedArtistsLoading && !followedArtists?.length ?
              <div className='library-page__loader-wrapper'><Spin /></div> :
              followedArtists?.map((artist, index) =>
                <ArtistCardComponent
                  artist={artist}
                  key={artist.artistId}
                  reference={((index === followedArtists?.length && isMoreFollowedArtistsForLoading)) ? artistRef : null} />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};