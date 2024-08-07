import React, { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './pages/components/Footer';
import Header from './pages/components/Header';
import { LeagueList } from './pages/components/LeagueList';
import Home from './pages/Home';
import StandingsPage from './pages/StandingsPage';
import { useFetchRoutes } from './redux/api';
import { store } from './store';
import { FAVOURITES_STORAGE_KEY } from './utils/constants';
import { getProperty } from './utils/localStorageUtil';
import { isLeagueValid } from './utils/validation';

const App = () => {
    const { data: allLeagues, error, isLoading } = useFetchRoutes();
    const [leagues, setLeagues] = useState<League[]>(null);
    const favouriteLeagueIds: string[] = getProperty(FAVOURITES_STORAGE_KEY, 'ids');

    const showFavouriteLeagues = () => {
        return leagues && favouriteLeagueIds && favouriteLeagueIds.length !== 0;
    };

    useEffect(() => {
        if (allLeagues) {
            setLeagues(allLeagues.leagues.filter(league => isLeagueValid(league)));
        }
    }, [allLeagues]);

    return (
        <StrictMode>
            <head>
                <base href="/football-rankings" />
            </head>
            <Provider store={store}>
                <div className="App">
                    <Header />
                    <Router>
                        {(leagues === undefined || isLoading) && <div className="loading">loading...</div>}
                        {error && <p>{error}</p>}
                        {leagues
                            && (<div className="content">
                                <Switch>
                                    <Route exact path="/football-rankings" >
                                        <Home leagues={leagues} />
                                    </Route>
                                    <Route path="/football-rankings/leagues"/>
                                    {leagues.map((league: League, index) => (
                                        <Route exact path={`/football-rankings/${league.slug}/:id`} key={index}>
                                            <StandingsPage leagueName={league.slug} leagueId={league.id}/>
                                        </Route>))}
                                </Switch>
                            </div>
                            )}
                    </Router>
                    {showFavouriteLeagues() && (
                        <>
                            <h1 style={{ display: 'flex', justifyContent: 'center', fontSize: 'xxx-large', margin: '20px' }}>
                                Your Favourite Leagues
                            </h1>
                            <div className="league-grid">
                                <LeagueList leagues={leagues.filter((v) => {
                                    return favouriteLeagueIds.findIndex(id => id === v.id) !== -1;
                                })}/>
                            </div>
                        </>
                    )}

                    <h1 style={{ display: 'flex', justifyContent: 'center', fontSize: 'xxx-large', margin: '20px' }}>
                        All Leagues
                    </h1>
                    <div className="league-grid" id="league-grid">{leagues && <LeagueList leagues={leagues}/>}</div>
                    <Footer />
                </div>
            </Provider>
        </StrictMode>
    );
};

export default App;
