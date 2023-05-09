import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetAvailableSeasonsQuery, useGetLeagueByNameAndSeasonQuery } from '../redux/api';
import { FAVOURITES_STORAGE_KEY } from '../utils/constants';
import { getProperty, setProperty } from '../utils/localStorageUtil';
import { isStandingsValid } from '../utils/validation';
import { StandingsTable } from './components/StandingsTable';

const StandingsPage = (props:{ leagueName:string, leagueId: string }) => {
    const { leagueName, leagueId } = props;
    const { id } = useParams<{ id: string }>();
    const {
        data: standings,
        error: errorLeague,
        isLoading: isLoadingLeague,
    } = useGetLeagueByNameAndSeasonQuery(`${leagueName}/standings?season=${id}`);
    const {
        data: seasons,
        error: errorSeasons,
        isLoading: isLoadingSeasons,
    } = useGetAvailableSeasonsQuery(`${leagueName}/standings?season=1`);
    const [currentPage, setCurrentPage] = useState(0);
    const favouriteLeagueIds: string[] | null = getProperty(FAVOURITES_STORAGE_KEY, 'ids');

    useEffect(() => {
        setCurrentPage(0);
    }, [id, leagueName]);

    if (errorLeague) return <p>{errorLeague}</p>;
    if (errorSeasons) return <p>{errorSeasons}</p>;
    if (standings && !isStandingsValid(standings)) return <p>Standings are currently not available for this league.</p>;

    return (
        <div className="standings-page" >
            {(isLoadingLeague || isLoadingSeasons) && <div className="loading">loading...</div>}

            <div className="league-name-fav">
                <h2 className="league-name" >{standings && standings.name}</h2>
                {
                    favouriteLeagueIds && favouriteLeagueIds.findIndex(v => v === leagueId) !== -1
                        ? <Button variant="text" color="error" onClick={() => {
                            let favourites = getProperty(FAVOURITES_STORAGE_KEY, 'ids');
                            favourites = favourites.filter(v => v !== leagueId);
                            setProperty(FAVOURITES_STORAGE_KEY, 'ids', favourites);
                            window.location.reload();
                        }
                        }><Favorite style={{ margin: '0 5px', color: '#0cc2bc' }}/></Button>
                        : <Button variant="text" color="success" onClick={() => {
                            let favourites = getProperty(FAVOURITES_STORAGE_KEY, 'ids');
                            if (favourites) favourites.push(leagueId);
                            else favourites = [leagueId];
                            setProperty(FAVOURITES_STORAGE_KEY, 'ids', favourites);
                            window.location.reload();
                        }
                        }><FavoriteBorder style={{ margin: '0 5px', color: '#0cc2bc' }}/></Button>
                }
            </div>

            {seasons && <div className="season-names">
                {standings
                    && id === String(seasons.seasons[seasons.seasons.length - 1].year)
                    && <p className="invalid-season">{`${Number(id) - 1} - ${id}`}</p>
                }
                {standings
                    && id !== String(seasons.seasons[seasons.seasons.length - 1].year)
                    && <Link className="season-navigator" to={`/mackolik/${leagueName}/${Number(id) - 1}`}
                        style={{ textDecoration: 'none' }}>{`${Number(id) - 1} - ${id}`}</Link>
                }
                <h3 className="season-name">{standings && `${id} - ${Number(id) + 1}`}</h3>
                {standings
                    && id !== String(seasons.seasons[0].year)
                    && <Link className="season-navigator" to={`/mackolik/${leagueName}/${Number(id) + 1}`}
                        style={{ textDecoration: 'none' }}>{`${Number(id) + 1} - ${Number(id) + 2}`}</Link>
                }
                {standings
                    && id === String(seasons.seasons[0].year)
                    && <p className="invalid-season">{`${Number(id) + 1} - ${Number(id) + 2}`}</p>
                }
            </div>}

            <div className="standings-table">
                {standings && standings.children.length > 1
                    && <div className="page-navigator">
                        <Button
                            className="page-button"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >{'<'}</Button>
                        <div>{standings.children[currentPage].abbreviation}</div>
                        <Button
                            className="page-button"
                            disabled={currentPage === standings.children.length - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >{'>'}</Button>
                    </div>
                }
                {standings && <StandingsTable rows={standings.children[currentPage].standings.entries}/> }
            </div>
        </div>
    );
};

export default StandingsPage;
