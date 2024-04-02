import React, { useEffect, useMemo, useState } from "react";
import { HeaderComponent } from "../../components/header/header.component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { songRadioActions } from "../../song-radio/store/song-radio.actions";
import { songRadioSelectors } from "../../song-radio/store/song-radio.selectors";
import { Input, Spin, Typography } from "antd";
import { getBackground } from "../../../helpers/react/listener-page.helper";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { GetListenerSongRadiosRequestData } from "../../song-radio/store/song-radio.model";
import { Search } from "@mui/icons-material";
import { SongRadioCardComponent } from "../../song-radio/song-radio-card/song-radio-card.component";

const { Title } = Typography;

export function LibraryListenerSongRadiosPage() {
  const { ref: songRadioRef, inView: songRadioInView } = useInView({ threshold: 1 });

  const [search, setSearch] = useState<string>('');
  const [songRadiosOffset, setSongRadiosOffset] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const listenerSongRadios = useSelector(songRadioSelectors.listenerSongRadios);
  const isMoreListenerSongRadiosForLoading = useSelector(songRadioSelectors.isMoreListenerSongRadiosForLoading);
  const isListenerSongRadiosLoading = useSelector(songRadioSelectors.isListenerSongRadiosLoading);

  const dispatch = useDispatch()
  const getListenerSongRadios = (request: GetListenerSongRadiosRequestData) =>
    dispatch(songRadioActions.getListenerSongRadios(request));
  const loadMoreListenerSongRadios = (request: GetListenerSongRadiosRequestData) =>
    dispatch(songRadioActions.loadMoreListenerSongRadios(request));

  const handleLoadMoreListenerSongRadios = async () => {
    if (!isListenerSongRadiosLoading && (typeof isMoreListenerSongRadiosForLoading === 'undefined' || isMoreListenerSongRadiosForLoading)) {
      loadMoreListenerSongRadios({
        offset: songRadiosOffset,
        limit: 10,
        search: debouncedSearch
      });
      setSongRadiosOffset(state => state + 1);
    }
  };

  const renderSearchInput = () => {
    return (
      <Input
        placeholder="Main radio song name"
        style={{ width: '300px', borderRadius: '50px' }}
        onChange={(event) => setSearch(event.target.value)}
        prefix={<Search className="search-page__search-icon" />}
        allowClear />
    );
  }

  useEffect(() => {
    getListenerSongRadios({
      offset: 0,
      limit: 10,
      search: debouncedSearch
    })
    setSongRadiosOffset(1)
  }, [debouncedSearch])

  useEffect(() => {
    if (songRadioInView) {
      handleLoadMoreListenerSongRadios();
    }
  }, [songRadioInView]);


  return (
    <div className='listener-group-page__wrapper custom-scroll-y'>
      <div style={{ background: getBackground() }} className="library-listener-song-radios-page listener-group-page">
        <HeaderComponent
          showHeader={true}
          element={renderSearchInput()} />
        <div className="library-listener-song-radios-page-wrapper">
          <Title className="mt-0" level={1}>Song Radios</Title>
          <div className="library-listener-song-radios-page__content">
            {isListenerSongRadiosLoading && !listenerSongRadios?.length ?
              <div className='library-page__loader-wrapper'><Spin /></div> :
              listenerSongRadios?.map((songRadio, index) =>
                <SongRadioCardComponent
                  songRadio={songRadio}
                  key={'song-radio' + songRadio.baseSongId}
                  reference={((index === listenerSongRadios?.length && isMoreListenerSongRadiosForLoading)) ? songRadioRef : null} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};