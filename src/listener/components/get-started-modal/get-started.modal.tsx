import React, { useEffect, useMemo, useState } from "react";
import { Button, Input, Modal, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listenerSelectors } from "../../store/listener.selectors";
import { listenerActions } from "../../store/listener.actions";
import { GetExistingGenresRequestData, GetRecommendedArtistsRequestData, GetStartedGenresData, GetStartedGenresTypeEnum, SaveGetStartedResultsRequestData } from "../../store/listener.model";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
import { songGenres } from "../../../config";
import { ArtistCardComponent } from "../../artist/artist-card/artist-card.component";
import { useInView } from "react-intersection-observer";
import { renderTitleWithToolTip } from "../../../helpers/react/form.helper";

const { Text, Title } = Typography;

export function GetStartedModal() {
  const { ref: artistRef, inView: artistInView } = useInView({ threshold: 0 });

  const [artistOffset, setArtistOffset] = useState<number>(0);
  const [isRecommendedArtistsStage, setIsRecommendedArtistsStage] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [choosenGenres, setChoosenGenres] = useState<Array<string>>([]);
  const [choosenArtists, setChoosenArtists] = useState<Array<string>>([]);

  const [debouncedChoosenGenres] = useDebounce(choosenGenres, 1000);
  const [debouncedSearch] = useDebounce(search, 500);

  const isGetStartedModalOpen = useSelector(listenerSelectors.isGetStartedModalOpen);
  const recommendedGenres = useSelector(listenerSelectors.recommendedGenres);
  const otherGenres = useSelector(listenerSelectors.otherGenres);
  const isExistingGenresLoading = useSelector(listenerSelectors.isExistingGenresLoading);
  const isRecommendedArtistsLoading = useSelector(listenerSelectors.isRecommendedArtistsLoading);
  const isMoreRecommendedArtistsForLoading = useSelector(listenerSelectors.isMoreRecommendedArtistsForLoading);
  const recommendedArtists = useSelector(listenerSelectors.recommendedArtists);
  const isSaveGetStartedResultsLoading = useSelector(listenerSelectors.isSaveGetStartedResultsLoading);

  const genresToDisplay: Array<GetStartedGenresData> = useMemo(() => {
    return [
      ...choosenGenres.map(genre => ({ genre: genre, type: GetStartedGenresTypeEnum.choosen })),
      ...(recommendedGenres || []).map(genre => ({ genre: genre, type: GetStartedGenresTypeEnum.recommended })),
      ...(otherGenres || []).map(genre => ({ genre: genre, type: GetStartedGenresTypeEnum.other }))
    ];
  }, [choosenGenres, recommendedGenres, otherGenres])

  const dispatch = useDispatch();
  const closeGetStartedModal = () => dispatch(listenerActions.closeGetStartedModal());
  const getExistingGenres = (requset: GetExistingGenresRequestData) => dispatch(listenerActions.getExistingGenres(requset));
  const getRecommendedArtists = (requset: GetRecommendedArtistsRequestData) => dispatch(listenerActions.getRecommendedArtists(requset));
  const loadMoreRecommendedArtists = (requset: GetRecommendedArtistsRequestData) => dispatch(listenerActions.loadMoreRecommendedArtists(requset));
  const saveGetStartedResults = (requset: SaveGetStartedResultsRequestData) => dispatch(listenerActions.saveGetStartedResults(requset));

  const closeModal = () => {
    closeGetStartedModal();
  }

  const changeGenreChooseness = (genreData: GetStartedGenresData) => {
    if (choosenGenres.includes(genreData.genre)) {
      setChoosenGenres(state => [...state.filter(genre => genre !== genreData.genre)]);
    } else {
      setChoosenGenres(state => [genreData.genre, ...state]);
    }
  }

  const changeArtistChooseness = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, artistId: string) => {
    event.stopPropagation();
    if (choosenArtists.includes(artistId)) {
      setChoosenArtists(state => [...state.filter(artist => artist !== artistId)]);
    } else {
      setChoosenArtists(state => [...state, artistId]);
    }
  }

  useEffect(() => {
    getExistingGenres({
      choosenGenres: [],
      search: ''
    });
  }, []);

  useEffect(() => {
    if (debouncedChoosenGenres && !isExistingGenresLoading) {
      getExistingGenres({
        choosenGenres: debouncedChoosenGenres,
        search: debouncedSearch
      });
    }
  }, [debouncedChoosenGenres, debouncedSearch]);

  const handleLoadMoreArtists = async () => {
    if (!isRecommendedArtistsLoading && (typeof isMoreRecommendedArtistsForLoading === 'undefined' || isMoreRecommendedArtistsForLoading)) {
      loadMoreRecommendedArtists({
        offset: artistOffset,
        limit: 10,
        genres: choosenGenres
      });
      setArtistOffset(state => state + 1);
    }
  };

  useEffect(() => {
    if (isRecommendedArtistsStage) {
      getRecommendedArtists({
        limit: 10,
        offset: 0,
        genres: choosenGenres
      });
      setArtistOffset(1);
    }
  }, [isRecommendedArtistsStage])

  useEffect(() => {
    if (artistInView) {
      handleLoadMoreArtists();
    }
  }, [artistInView]);

  const renderChooseGenresStage = () => {
    return (
      <>
        {renderTitleWithToolTip('Choose genres you like', 'With this information, we will be able to offer you artists in these genres, as well as select the most accurate recommendations', 3, false)}
        <Input
          placeholder="Genre"
          style={{ borderRadius: '50px' }}
          onChange={(event) => setSearch(event.target.value)}
          prefix={<Search className="search-page__search-icon" />}
          allowClear />
        <div style={{ maxHeight: 400 }} className="custom-scroll-y">
          <div className='get-started-modal__genres-section'>
            {genresToDisplay.map(genreData =>
              (choosenGenres.includes(genreData.genre) && genreData.type !== 'choosen') ? <></> : <div
                key={genreData.type + genreData.genre}
                onClick={() => changeGenreChooseness(genreData)}
                className={`get-started-modal__genre-wrapper--${genreData.type}`}>
                {songGenres[genreData.genre]?.label}
              </div>)}
          </div>
        </div>
      </>
    )
  };

  const renderRecommendedArtistsStage = () => {
    return (
      <>
        {(!recommendedArtists?.length && !isRecommendedArtistsLoading) ?
          <Title level={2}>No artist found for choosed genres</Title> :
          <div>
            {renderTitleWithToolTip('You might know this artists', 'Choose all artist you would like to follow before pressing \'Done\' button or skip this stage. You always will be able to follow and unfollow them by yourself at any time. NOTE: you can go back and reselect genres to alter artist recomendations', 3, false)}
            <div className='get-started-modal__artists-wrapper custom-scroll-y'>
              <div className="get-started-modal__artists">
                {isRecommendedArtistsLoading && !recommendedArtists?.length ?
                  <div className='get-started-modal__loader-wrapper'><Spin /></div> :
                  recommendedArtists?.map((artist, index) =>
                    <div
                      key={artist.artistId}
                      onClick={(e) => changeArtistChooseness(e, artist.artistId!)}>
                      <ArtistCardComponent
                        artist={artist}
                        shouldRedirectToArtistPage={false}
                        choosed={choosenArtists.includes(artist.artistId!)}
                        reference={((index === recommendedArtists?.length && isMoreRecommendedArtistsForLoading)) ? artistRef : null} />
                    </div>
                  )}
              </div>
            </div>
          </div>
        }
      </>
    );
  }

  return (
    <Modal
      title='Get started'
      open={isGetStartedModalOpen}
      closable={false}
      onCancel={() => closeModal()}
      width={isRecommendedArtistsStage ? 600 : 400}
      confirmLoading={isExistingGenresLoading}
      style={{ maxHeight: 500 }}
      footer={[
        isRecommendedArtistsStage ? <Button
          className="get-started-modal__cancel-button"
          key="cancel"
          onClick={() => setIsRecommendedArtistsStage(false)}>
          Back
        </Button> : null,
        <Button
          className="get-started-modal__ok-button"
          key="submit"
          type="primary"
          disabled={isRecommendedArtistsStage ? isSaveGetStartedResultsLoading : !choosenGenres?.length}
          onClick={() => isRecommendedArtistsStage ?
            saveGetStartedResults({ artistIds: choosenArtists, genres: choosenGenres }) :
            setIsRecommendedArtistsStage(true)}>
          {isRecommendedArtistsStage ? 'Done' : 'Next'}
        </Button>
      ]}>
      {isRecommendedArtistsStage ?
        renderRecommendedArtistsStage() :
        renderChooseGenresStage()}
    </Modal >
  );
}