import React, { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer } from './pages/components/Footer';
import Header from './pages/components/Header';
import { LeagueGrid } from './pages/components/LeagueGrid';
import Home from './pages/Home';
import StandingsPage from './pages/StandingsPage';
import { useFetchRoutes } from './redux/api';
import { store } from './store';
import { isLeagueValid } from './utils/validation';

const App = () => {
    const { data: allLeagues, error, isLoading } = useFetchRoutes();
    const [leagues, setLeagues] = useState<League[]>(null);

    useEffect(() => {
        if (allLeagues) {
            setLeagues(allLeagues.leagues.filter(league => isLeagueValid(league)));
        }
    }, [allLeagues]);

    return (
        <StrictMode>
            <head>
                <base href="/mackolik" />
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
                                    <Route exact path="/mackolik" component={Home} />
                                    <Route path="/leagues" component={LeagueGrid} />
                                    {leagues.map((league: League, index) => (
                                        <Route exact path={`/mackolik/${league.slug}/:id`} key={index}>
                                            <StandingsPage leagueName={league.slug}/>
                                        </Route>))}
                                </Switch>
                            </div>
                            )}
                    </Router>
                    <div className="league-grid">{leagues && <LeagueGrid leagues={leagues}/>}</div>
                    <Footer />
                </div>
            </Provider>
        </StrictMode>
    );
};

export default App;
